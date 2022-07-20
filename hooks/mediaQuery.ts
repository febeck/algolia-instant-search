import { useBreakpointValue } from "@chakra-ui/react";

export function useIsMdOrBigger() {
  return useBreakpointValue({ base: false, md: true })
}
