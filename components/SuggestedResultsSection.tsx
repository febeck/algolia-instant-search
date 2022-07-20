import { type SearchResponse } from "@algolia/client-search/dist/client-search";
import { Grid, Text, VStack } from "@chakra-ui/react";
import { Restaurant } from "../types/restaurants";
import { HitCard } from "./HitCard";

interface SuggestedResultsSection {
  searchResults: SearchResponse<Restaurant> | undefined;
  sectionTitle: string;
}

export function SuggestedResultsSection({
  searchResults,
  sectionTitle,
}: SuggestedResultsSection) {
  if (!searchResults) return null;
  if (searchResults.hits.length === 0) return null;

  return (
    <VStack
      gap={2}
      alignItems={"stretch"}
      my={10}
      backgroundColor={"gray.100"}
      p={6}
      borderRadius={"lg"}
    >
      <Text fontSize={"2xl"} fontWeight={"semibold"}>
        {sectionTitle}
      </Text>

      <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={4}>
        {searchResults?.hits?.map((hit) => (
          // @ts-ignore don't care it actually being a hit for the highlight...
          <HitCard key={hit.objectID} hit={hit} />
        ))}
      </Grid>
    </VStack>
  );
}
