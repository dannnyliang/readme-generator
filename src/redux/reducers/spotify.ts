import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthResponse } from "../../apis/spotifyApp";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { RootState } from "../..";

type SpotifyState = {
  accessToken?: AuthResponse;
  data?: any;
};

const name = "spotify";
const initialState: SpotifyState = {};

const spotifySlice = createSlice({
  name,
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AuthResponse>) => {
      window.localStorage.setItem(
        LOCALSTORAGE_TOKEN.SPOTIFY,
        JSON.stringify(action.payload)
      );
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      window.localStorage.removeItem(LOCALSTORAGE_TOKEN.SPOTIFY);
      state.accessToken = undefined;
    },
  },
});

/** ----- Selectors ----- */
export const selectAccessToken = (state: RootState) =>
  state.spotify.accessToken;

/** ----- Actions ----- */
export const { setAccessToken, clearAccessToken } = spotifySlice.actions;

/** ----- Reducer ----- */
export default spotifySlice.reducer;
