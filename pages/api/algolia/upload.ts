import type { NextApiRequest, NextApiResponse } from "next";
import { adminRestaurantIndex } from "../../../helpers/algolia";

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  message: string;
};

type MyResponse = ErrorResponse | SuccessResponse;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Increase Next.js default value of 4mb
    },
  },
};

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse<MyResponse>
) {
  // Refuse all unhandled methods with the
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });

  // Do this sync to ensure users are able to then see and use the file they have just uploaded
  const response = await adminRestaurantIndex
    .replaceAllObjects(req.body, { safe: true })
    .wait();

  return res.status(201).json({ message: "ok" });
}
