import { Box, Container, Link as ChakraLink, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { UrlObject } from "url";

interface HeaderLinkProps {
  href: string | UrlObject;
  children: React.ReactNode;
}

function HeaderLink({ href, children }: HeaderLinkProps) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink>{children}</ChakraLink>
    </NextLink>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Box as="header" minH={14} backgroundColor="pink.100">
        <Container
          display="flex"
          maxW="container.xl"
          alignItems="center"
          h="100%"
          fontWeight="extrabold"
          color="gray.500"
        >
          <HStack gap={2}>
            <HeaderLink href="/">Home</HeaderLink>
            <HeaderLink href="/search">Search</HeaderLink>
            <HeaderLink href="/restaurants/create">Create</HeaderLink>
            <HeaderLink href="/restaurants/upload">Upload</HeaderLink>
            <ChakraLink href="https://github.com/febeck/algolia-instant-search">
              Github
            </ChakraLink>
          </HStack>
        </Container>
      </Box>

      <Box py={4} as="main" flexGrow={1}>
        {children}
      </Box>
    </>
  );
}
