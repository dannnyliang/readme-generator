import { extendTheme } from "@chakra-ui/react";

export const overrides = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        margin: 0,
      },
      h2: {
        margin: 0,
      },
    }),
  },
});
