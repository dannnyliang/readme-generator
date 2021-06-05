import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { QueryParamProvider } from "use-query-params";

import App from "./App";
import reducer from "./redux/reducers";

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
