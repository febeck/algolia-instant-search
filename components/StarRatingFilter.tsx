import { Box, Checkbox } from "@chakra-ui/react";
import React from "react";
import { useNumericMenu } from "react-instantsearch-hooks-web";

export function StarRatingMenu() {
  const numericMenu = useNumericMenu({
    attribute: "stars_count",
    items: [
      { label: "4 stars and more", start: 4 },
      { label: "3 stars and more", start: 3 },
      { label: "2 stars and more", start: 2 },
      { label: "1 star and more", start: 1 },
      { label: "All" },
    ],
  });

  if (numericMenu.hasNoResults) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    numericMenu.refine(e.target.value);
  }

  return (
    <Box as={"ul"} sx={{ listStyle: "none" }}>
      {numericMenu.items.map((item) => (
        <Box as={"li"} key={item.label}>
          <Checkbox
            name={item.label}
            isChecked={item.isRefined}
            value={item.value}
            onChange={handleChange}
          >
            {item.label}
          </Checkbox>
        </Box>
      ))}
    </Box>
  );
}
