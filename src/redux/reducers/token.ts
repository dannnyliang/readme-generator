import { createSlice } from "@reduxjs/toolkit";
import { isNil } from "ramda";

import { LOCALSTORAGE_TOKEN } from "../../constants";

type TokenState = {
  data?: {
    github?: {
      access_token: string;
    };
    spotify?: {
      access_token: string;
    };
  };
  error: any;
};

const name = "token";
const initialState: TokenState = {
  error: null,
};

const tokenSlice = createSlice({
  name,
  initialState,
  reducers: {
    initializeToken: (state) => {
      const localStorageTokenSpotify = window.localStorage.getItem(
        LOCALSTORAGE_TOKEN.SPOTIFY
      );
      const localStorageTokenGithub = window.localStorage.getItem(
        LOCALSTORAGE_TOKEN.GITHUB
      );
      state.data = {
        spotify: isNil(localStorageTokenSpotify)
          ? undefined
          : JSON.parse(localStorageTokenSpotify),
        github: isNil(localStorageTokenGithub)
          ? undefined
          : JSON.parse(localStorageTokenGithub),
      };
    },
  },
});

/** ----- Actions ----- */
export const { initializeToken } = tokenSlice.actions;

/** ----- Reducer ----- */
export default tokenSlice.reducer;
