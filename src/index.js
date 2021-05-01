import "./index.css";

import * as serviceWorker from "./serviceWorker";

import { QueryCache, ReactQueryCacheProvider } from "react-query";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";

import "./styles/gfm.css";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
