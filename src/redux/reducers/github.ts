import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GithubUser } from "../../apis/githubApi";
import { AuthSuccess } from "../../apis/githubApp";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { RootState } from "../..";

type GithubState = {
  accessToken?: AuthSuccess;
  user?: GithubUser;
  readme?: {
    content: string;
    sha: string;
  };
};

const name = "github";
const initialState: GithubState = {};

const githubSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAccessToken: {
      reducer: (state, action: PayloadAction<AuthSuccess>) => {
        window.localStorage.setItem(
          LOCALSTORAGE_TOKEN.GITHUB,
          JSON.stringify(action.payload)
        );
        state.accessToken = action.payload;
      },
      prepare: (accessToken: AuthSuccess) => ({ payload: accessToken }),
    },
    clearAccessToken: (state) => {
      window.localStorage.removeItem(LOCALSTORAGE_TOKEN.GITHUB);
      state.accessToken = undefined;
    },
    setUser: {
      reducer: (state, action: PayloadAction<GithubUser>) => {
        state.user = action.payload;
      },
      prepare: (user: GithubUser) => ({ payload: user }),
    },
    setReadme: {
      reducer: (
        state,
        action: PayloadAction<NonNullable<GithubState["readme"]>>
      ) => {
        state.readme = action.payload;
      },
      prepare: (readme: NonNullable<GithubState["readme"]>) => ({
        payload: readme,
      }),
    },
  },
});

/** ----- Selectors ----- */
export const selectAccessToken = (state: RootState) => state.github.accessToken;
export const selectUser = (state: RootState) => state.github.user;
export const selectReadme = (state: RootState) => state.github.readme;

/** ----- Actions ----- */
export const { setAccessToken, clearAccessToken, setUser, setReadme } =
  githubSlice.actions;

/** ----- Reducer ----- */
export default githubSlice.reducer;
