import React from "react";
import { createElement, Fragment, useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { useSearchBox } from "react-instantsearch-hooks";
import { autocomplete, AutocompleteOptions } from "@algolia/autocomplete-js";
import { BaseItem } from "@algolia/autocomplete-core";
import { Text } from "@chakra-ui/react";

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

export function Autocomplete({
  className,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  const { query, refine: setQuery } = useSearchBox();

  const [instantSearchUiState, setInstantSearchUiState] =
    useState<SetInstantSearchUiStateOptions>({ query });

  useEffect(() => {
    setQuery(instantSearchUiState.query);
  }, [setQuery, instantSearchUiState]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query },
      onReset() {
        setInstantSearchUiState({ query: "" });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query,
          });
        }
      },
      // @ts-ignore
      renderer: { createElement, Fragment, render },
    });

    return () => autocompleteInstance.destroy();
  }, []);

  return <div className={className} ref={autocompleteContainer} />;
}

export function AutocompleteSectionHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Text fontSize="xl" fontWeight="bold">
      {children}
    </Text>
  );
}

export function AutocompleteHighlighter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Text
      display="flex"
      sx={{
        mark: {
          backgroundColor: "var(--chakra-colors-pink-100)",
          color: "var(--chakra-colors-pink-500)",
        },
      }}
    >
      {children}
    </Text>
  );
}
