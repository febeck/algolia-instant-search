import type { GetServerSideProps } from "next";
import {
  Configure,
  RefinementList,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  ClearRefinements,
  InstantSearchServerState,
  InstantSearchSSRProvider,
  useHits,
  useInstantSearch,
  CurrentRefinements,
} from "react-instantsearch-hooks-web";
import { getServerState } from "react-instantsearch-hooks-server";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import type { UiState } from "instantsearch.js";
import { HitCard } from "../components/HitCard";
import { StarRatingMenu } from "../components/StarRatingFilter";
import { Layout } from "../components/Layout";
import { searchClient } from "../helpers/algolia";
import { Restaurant } from "../types/restaurants";
import {
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDeleteRestaurant } from "../hooks/restaurants";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type SearchPageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol =
    req.headers.referer?.split("://")[0] ||
    req.headers.host?.includes("localhost") // hack to prevent https locally
      ? "http"
      : "https";
  const url = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(<SearchPage url={url} />);

  return {
    props: {
      serverState,
      url,
    },
  };
};

function Results() {
  const hits = useHits<Restaurant>();
  const { refresh } = useInstantSearch();
  const deleteMutation = useDeleteRestaurant();
  const deletedItems = useRef(new Set<Restaurant["objectID"]>());

  // This is a hack to allow hiding the element to the user becuase the
  // deleted result is still there when the query is refreshed...
  function handleDeleteClick(objectID: Restaurant["objectID"]) {
    deletedItems.current.add(objectID);
    deleteMutation.mutate(objectID);
  }

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      refresh();
    }
  }, [deleteMutation.isSuccess, refresh]);

  if (!hits.results) return null;

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={4}>
      {hits.results.hits
        .filter((hit) => !deletedItems.current.has(hit.objectID))
        .map((hit) => (
          <HitCard key={hit.objectID} hit={hit}>
            <Button
              onClick={() => {
                handleDeleteClick(hit.objectID);
              }}
              ml={2}
              colorScheme="red"
              rightIcon={<DeleteIcon />}
              variant={"outline"}
            >
              Delete
            </Button>
          </HitCard>
        ))}
    </Grid>
  );
}

export default function SearchPage({ serverState, url }: SearchPageProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    // React query and Algolia SSR don't play well together and have to wrap the component
    // here again as well otherwise it doesn't identify the provider...
    <QueryClientProvider client={queryClient}>
      <InstantSearchSSRProvider {...serverState}>
        <Layout>
          <InstantSearch
            searchClient={searchClient}
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_RESTAURANTS!}
            routing={{
              router: history({
                getLocation() {
                  if (typeof window === "undefined") {
                    return new URL(url!) as unknown as Location;
                  }

                  return window.location;
                },
              }),
              stateMapping: {
                stateToRoute(uiState) {
                  const indexUiState =
                    uiState[
                      process.env.NEXT_PUBLIC_ALGOLIA_INDEX_RESTAURANTS!
                    ] || {};

                  return {
                    q: indexUiState.query,
                    foodType: indexUiState.refinementList?.food_type,
                    starRate: indexUiState.numericMenu?.stars_count,
                  } as UiState;
                },
                routeToState(routeState) {
                  return {
                    [process.env.NEXT_PUBLIC_ALGOLIA_INDEX_RESTAURANTS!]: {
                      query: routeState.q,
                      refinementList: {
                        food_type: routeState.foodType,
                      },
                      numericMenu: {
                        stars_count: routeState.starRate,
                      },
                    } as UiState,
                  };
                },
              },
            }}
          >
            <Configure hitsPerPage={24} />
            <div className="search-panel">
              {/* <div className="search-panel__filters">
                  <ClearRefinements />
                  <CurrentRefinements />

                  <Text fontSize="xl" fontWeight="bold" mt={4}>
                    Food type
                  </Text>
                  <RefinementList attribute="food_type" showMore searchable />

                  <Text fontSize="xl" fontWeight="bold" mt={4}>
                    Star rating
                  </Text>
                  <StarRatingMenu />
                </div> */}

              <VStack flex="3 1" align="stretch" spacing={4}>
                <SearchBox
                  placeholder=""
                  className="searchbox"
                  id="mainSearchBox"
                />

                <Results />

                <Center className="pagination">
                  <Pagination />
                </Center>
              </VStack>
            </div>
          </InstantSearch>
        </Layout>
      </InstantSearchSSRProvider>
    </QueryClientProvider>
  );
}
