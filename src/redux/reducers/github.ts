import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthResponse } from "../../apis/github";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { RootState } from "../..";

type GithubState = {
  accessToken?: AuthResponse;
  data?: any;
};

const name = "github";
const initialState: GithubState = {};

const githubSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAccessToken: {
      reducer: (state, action: PayloadAction<AuthResponse>) => {
        window.localStorage.setItem(
          LOCALSTORAGE_TOKEN.GITHUB,
          JSON.stringify(action.payload)
        );
        state.accessToken = action.payload;
      },
      prepare: (accessToken: AuthResponse) => {
        return { payload: accessToken };
      },
    },
    clearAccessToken: (state) => {
      window.localStorage.removeItem(LOCALSTORAGE_TOKEN.GITHUB);
      state.accessToken = undefined;
    },
  },
});

/** ----- Selectors ----- */
export const selectAccessToken = (state: RootState) => state.github.accessToken;

/** ----- Actions ----- */
export const { setAccessToken, clearAccessToken } = githubSlice.actions;

/** ----- Reducer ----- */
export default githubSlice.reducer;
