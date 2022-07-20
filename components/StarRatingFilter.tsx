import { Checkbox } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useNumericMenu } from "react-instantsearch-hooks-web";

export function StarRatingMenu() {
  const numericMenu = useNumericMenu({
    attribute: "stars_count",
    items: [
      { label: "4 stars and more", start: 4, end: 5 },
      { label: "3 stars and more", start: 3, end: 5 },
      { label: "2 stars and more", start: 2, end: 5 },
      { label: "1 star and more", start: 1, end: 5 },
      { label: "All" },
    ],
  });

  if (numericMenu.hasNoResults) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    numericMenu.refine(e.target.value);
  }

  return (
    <Fragment>
      {numericMenu.items.map((item) => (
        <div key={item.label}>
          <Checkbox
            isChecked={item.isRefined}
            value={item.value}
            onChange={handleChange}
          >
            {item.label}
          </Checkbox>
        </div>
      ))}
    </Fragment>
  );
}
