export type Geoloc = {
    lat: number;
    lng: number;
}

export type Restaurant = {
  _geoloc: Geoloc;
  address: string;
  area: string;
  city: string;
  country: string;
  dining_style: string;
  food_type: string;
  image_url: string;
  mobile_reserve_url: string;
  name: string;
  neighborhood: string;
  objectID: string;
  payment_options: string[];
  phone_number: string;
  phone: string;
  postal_code: string;
  price_range: string;
  price: number;
  reserve_url: string;
  reviews_count: number;
  rounded_stars_count: number;
  stars_count: number;
  state: string;
}


export type NewRestaurant = Omit<Restaurant, 'objectID'>