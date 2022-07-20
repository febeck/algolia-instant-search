import algoliasearch from "algoliasearch";
import algoliasearchLite from "algoliasearch/lite";

export const searchClient = algoliasearchLite(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_READ_API_KEY!
);

export const searchRestaurantIndex = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_RESTAURANTS!
);

export const adminClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_WRITE_API_KEY!
);

export const adminRestaurantIndex = adminClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_RESTAURANTS!
);
