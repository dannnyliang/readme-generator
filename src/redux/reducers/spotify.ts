import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { spotifyApi } from "../../apis/spotifyApi";
import { AuthSuccess } from "../../apis/spotifyApp";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { artistDataTransformer, trackDataTransformer } from "../../utils";
import { getArtistContent, getTrackContent } from "../../utils/generator";

type SpotifyState = {
  accessToken?: AuthSuccess;
  tracks?: Record<string, any>[];
  artists?: Record<string, any>[];
  trackContent: string;
  artistContent: string;
};

export const name = "spotify";
const initialState: SpotifyState = {
  trackContent: "",
  artistContent: "",
};

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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        spotifyApi.endpoints.getTopTracks.matchFulfilled,
        (state, { payload }) => {
          state.tracks = payload.items;
          state.trackContent = getTrackContent(
            trackDataTransformer(payload.items)
          );
        }
      )
      .addMatcher(
        spotifyApi.endpoints.getTopArtists.matchFulfilled,
        (state, { payload }) => {
          console.log(payload);
          state.artists = payload.items;
          state.artistContent = getArtistContent(
            artistDataTransformer(payload.items)
          );
        }
      );
  },
});

/** ----- Actions ----- */
export const { setAccessToken, clearAccessToken } = spotifySlice.actions;

/** ----- Reducer ----- */
export default spotifySlice.reducer;
