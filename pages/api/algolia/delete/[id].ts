import type { NextApiRequest, NextApiResponse } from "next";
import { adminRestaurantIndex } from "../../../../helpers/algolia";

export default async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Refuse all unhandled methods with the
  if (req.method !== "DELETE")
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });

  try {
    // Try and find object before trying to delete it. Otherwise this will throw an error
    await adminRestaurantIndex.getObject(req.query.id as string);

    // Wait for sync object deletion before aknowledging to user the ressource has been deleted.
    // NOTE: calling the deleteObjects because the single instance did not seem to be returning
    // the id of the object being deleted in the payload
    await adminRestaurantIndex.deleteObjects([req.query.id as string]).wait();
  } catch (e: any) {
    // This could an error thrown by Algolia where we have more information
    if (e.status && e.message)
      return res.status(e.status).json({ error: e.message });
    return res.status(500).json({ error: "Unknown error" });
  }
  return res.status(204).end();
}
