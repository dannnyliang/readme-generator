import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";

import { githubApi } from "../apis/githubApi";
import { githubAppApi } from "../apis/githubApp";
import { spotifyApi } from "../apis/spotifyApi";
import { spotifyAppApi } from "../apis/spotifyApp";
import github from "./reducers/github";
import spotify from "./reducers/spotify";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"]
) =>
  configureStore({
    reducer: {
      [githubAppApi.reducerPath]: githubAppApi.reducer,
      [githubApi.reducerPath]: githubApi.reducer,
      [spotifyAppApi.reducerPath]: spotifyAppApi.reducer,
      [spotifyApi.reducerPath]: spotifyApi.reducer,
      github,
      spotify,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        githubAppApi.middleware,
        githubApi.middleware,
        spotifyAppApi.middleware,
        spotifyApi.middleware
      ),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
