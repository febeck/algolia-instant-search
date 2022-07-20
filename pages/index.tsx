import type { GetServerSideProps } from "next";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { type SearchResponse } from "@algolia/client-search/dist/client-search";
import { HitCard } from "../components/HitCard";
import { Layout } from "../components/Layout";
import { Restaurant } from "../types/restaurants";
import { searchClient, searchRestaurantIndex } from "../helpers/algolia";
import {
  Autocomplete,
  AutocompleteHighlighter,
  AutocompleteSectionHeader,
} from "../components/Autocomplete";
import { getAlgoliaFacets, getAlgoliaResults } from "@algolia/autocomplete-js";
import { useRouter } from "next/router";
import { Grid, Text, VStack } from "@chakra-ui/react";
import { SuggestedResultsSection } from "../components/SuggestedResultsSection";

interface HomePageProps {
  aroundHits: SearchResponse<Restaurant> | undefined;
  countryHits: SearchResponse<Restaurant> | undefined;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  req,
}) => {
  const { latitude, longitude, country } = req.cookies;

  let aroundHits, countryHits;

  if (latitude && longitude) {
    aroundHits = await searchRestaurantIndex.search<Restaurant>("", {
      aroundLatLng: `${latitude}, ${longitude}`,
      aroundRadius: 10_000, // 10 km
      hitsPerPage: 4,
    });
  }

  console.log("👉 ~ country", country);
  if (country) {
    countryHits = await searchRestaurantIndex.search<Restaurant>("", {
      facetFilters: [`country:${country}`],
      hitsPerPage: 4,
    });
  }

  return { props: { aroundHits, countryHits } };
};

export default function HomePage(props: HomePageProps) {
  const router = useRouter();

  return (
    <Layout>
      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_RESTAURANTS!}
        >
          <Autocomplete
            placeholder="Search for restaurants and foodtypes..."
            getSources={({ query }) => {
              if (query.length === 0) return [];

              return [
                {
                  sourceId: "restaurants",
                  getItems() {
                    return getAlgoliaResults({
                      searchClient,
                      queries: [
                        {
                          indexName:
                            process.env.NEXT_PUBLIC_ALGOLIA_INDEX_RESTAURANTS!,
                          query,
                          params: { hitsPerPage: 8 },
                        },
                      ],
                    });
                  },
                  templates: {
                    header() {
                      return (
                        <AutocompleteSectionHeader>
                          Restaurant results for {query}
                        </AutocompleteSectionHeader>
                      );
                    },
                    item({ item, components }) {
                      return (
                        <AutocompleteHighlighter>
                          <components.Highlight attribute="name" hit={item} />
                        </AutocompleteHighlighter>
                      );
                    },
                  },
                },
                {
                  sourceId: "food_type",
                  getItems() {
                    return getAlgoliaFacets({
                      searchClient,
                      queries: [
                        {
                          indexName:
                            process.env.NEXT_PUBLIC_ALGOLIA_INDEX_RESTAURANTS!,
                          facet: "food_type",
                          params: {
                            facetQuery: query,
                            maxFacetHits: 4,
                          },
                        },
                      ],
                    });
                  },
                  templates: {
                    header() {
                      return (
                        <AutocompleteSectionHeader>
                          Food type results for {query}
                        </AutocompleteSectionHeader>
                      );
                    },
                    item({ item, components }) {
                      return (
                        <AutocompleteHighlighter>
                          <components.Highlight attribute="label" hit={item} />
                          <Text
                            fontSize={"small"}
                            color={"gray.600"}
                            ml={3}
                            fontStyle={"italic"}
                          >
                            {`(${item.count} restaurants)`}
                          </Text>
                        </AutocompleteHighlighter>
                      );
                    },
                  },
                  onSelect(params) {
                    router.push(`/search?foodType[0]=${params.item.label}`);
                  },
                },
              ];
            }}
          />
        </InstantSearch>

        <SuggestedResultsSection
          searchResults={props.aroundHits}
          sectionTitle="Check out those restaurants around you!"
        />
        <SuggestedResultsSection
          searchResults={props.countryHits}
          sectionTitle="What about these awesome restaurants in your country?"
        />
      </div>
    </Layout>
  );
}
