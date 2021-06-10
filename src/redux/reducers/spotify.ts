import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthSuccess } from "../../apis/spotifyApp";
import { LOCALSTORAGE_TOKEN } from "../../constants";

type SpotifyState = {
  accessToken?: AuthSuccess;
};

export const name = "spotify";
const initialState: SpotifyState = {};

const spotifySlice = createSlice({
  name,
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AuthSuccess>) => {
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

/** ----- Actions ----- */
export const { setAccessToken, clearAccessToken } = spotifySlice.actions;

/** ----- Reducer ----- */
export default spotifySlice.reducer;
