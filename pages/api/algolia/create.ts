import type { NextApiRequest, NextApiResponse } from "next";
import { NewRestaurant, Restaurant } from "../../../types/restaurants";
import { adminRestaurantIndex } from "../../../helpers/algolia";

type ErrorResponse = {
  error: string;
};

type SuccesResponse = Restaurant;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccesResponse>
) {
  // Refuse all unhandled methods
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: `Method '${req.method}' not allowed` });

  const {
    name,

    food_type,
    dining_style,
    stars_count,

    phone,
    address,
    neighborhood,
    postal_code,
    city,
    area,
    state,
    country,

    lat,
    lng,

    price,
    price_range,
    payment_options,
  } = req.body;

  const newRestaurant: NewRestaurant = {
    _geoloc: { lat, lng },
    address,
    area,
    city,
    country,
    dining_style,
    food_type,
    image_url: "https://www.opentable.com/img/restimages/31153.jpg",
    mobile_reserve_url: "https://m.i-dont-exist-url.com",
    name,
    neighborhood,
    payment_options,
    phone_number: phone, // Hack to prevent having to format phone number (would probably use lib from google)
    phone,
    postal_code,
    price_range,
    price: Number(price),
    reserve_url: "https://i-dont-exist-url.com",
    reviews_count: 1,
    rounded_stars_count: Math.round(stars_count),
    stars_count: Number(stars_count),
    state,
  };

  const response = await adminRestaurantIndex.saveObject(newRestaurant, {
    autoGenerateObjectIDIfNotExist: true,
  });

  return res
    .status(201)
    .json({ ...newRestaurant, objectID: response.objectID });
}
