import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { QueryParamProvider } from "use-query-params";

import App from "./App";
import { store } from "./redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryParamProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryParamProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
