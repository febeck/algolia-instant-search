import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Link as ChakraLink } from "@chakra-ui/react";
import type { Hit as AlgoliaHit } from "instantsearch.js";
import { Highlight } from "react-instantsearch-hooks-web";
import { useIsMdOrBigger } from "../hooks/mediaQuery";
import { Restaurant } from "../types/restaurants";
import { StarRating } from "./StarRating";

type HitCardProps = {
  hit: AlgoliaHit<Restaurant>;
  children?: React.ReactNode;
};

export function HitCard({ hit, children }: HitCardProps) {
  const isDesktop = useIsMdOrBigger();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      backgroundColor={"white"}
      _hover={{
        boxShadow: "lg",
      }}
    >
      <Box p="6">
        <Box
          sx={{ textTransform: "uppercase" }}
          letterSpacing="wide"
          fontSize="xs"
          fontWeight="medium"
          color="pink.500"
        >
          <Highlight attribute="food_type" hit={hit} />
        </Box>

        <Box
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          fontSize="lg"
          mt={1}
        >
          <Highlight attribute="name" hit={hit} />
        </Box>

        <Box mt={1}>
          <Highlight attribute="city" hit={hit} />
          <span> &bull; </span>
          <Highlight attribute="country" hit={hit} />
        </Box>

        <Box mt={1}>
          {"$".repeat(hit.price)}
          <span> &bull; </span>
          {hit.price_range}
        </Box>

        <Box mt={2}>
          <StarRating rating={hit.stars_count} starSize="16px" />
          <Box as="span" ml={1} color="gray.600" fontSize="sm">
            ({hit.reviews_count} reviews)
          </Box>
        </Box>

        <Box mt={5}>
          <Button
            as={ChakraLink}
            href={isDesktop ? hit.reserve_url : hit.mobile_reserve_url}
            rightIcon={<ExternalLinkIcon />}
            colorScheme="pink"
            variant="solid"
          >
            Book
          </Button>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
