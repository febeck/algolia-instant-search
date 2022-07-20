import { Box, Text } from "@chakra-ui/react";

interface StarRatingProps {
  rating: number;

  maxRating?: number;
  starBackground?: string;
  starColor?: string;
  starsCount?: number;
  starSize?: number | `${number}px`;
}

export function StarRating({
  maxRating = 5,
  rating = 2.5,
  starBackground = "#d4d4d4",
  starColor = "#fc0",
  starsCount = 5,
  starSize = "20px",
}: StarRatingProps) {
  const _starSize = typeof starSize === "number" ? `${starSize}px` : starSize;
  const percent = `${Math.round((rating / maxRating) * 100)}%`;

  return (
    <>
      <Text as="span" fontWeight="semibold" mr={1}>
        {rating.toFixed(1)}
      </Text>
      <Box
        aria-label={`Rating of this product is ${rating} out of ${maxRating}.`}
        display="inline-block"
        fontFamily="Times"
        fontSize={_starSize}
        lineHeight={1}
        letterSpacing={0}
        _before={{
          content: `"${"★".repeat(starsCount)}"`,
          background: `linear-gradient(
              90deg,
              ${starColor} ${percent},
              ${starBackground} ${percent}
            )`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      />
    </>
  );
}
