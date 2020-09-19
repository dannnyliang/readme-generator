import "./index.css";

import * as serviceWorker from "./serviceWorker";

import { QueryCache, ReactQueryCacheProvider } from "react-query";
import React, { createContext } from "react";

import App from "./App";
import ReactDOM from "react-dom";

export const DataContext = createContext();

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <DataContext.Provider value={{ tracks: [], artists: [] }}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <App />
      </ReactQueryCacheProvider>
    </DataContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
