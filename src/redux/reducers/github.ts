import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GithubUser } from "../../apis/githubApi";
import { AuthSuccess } from "../../apis/githubApp";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { splitReadmeContent } from "../../utils";
import { RootState } from "../..";

type GithubState = {
  accessToken?: AuthSuccess;
  user?: GithubUser;
  readme?: {
    content: string;
    sha: string;
  };
  introduction: string;
};

const name = "github";
const initialState: GithubState = {
  introduction: "",
};

const githubSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AuthSuccess>) => {
      window.localStorage.setItem(
        LOCALSTORAGE_TOKEN.GITHUB,
        JSON.stringify(action.payload)
      );
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      window.localStorage.removeItem(LOCALSTORAGE_TOKEN.GITHUB);
      state.accessToken = undefined;
    },
    setUser: (state, action: PayloadAction<GithubUser>) => {
      state.user = action.payload;
    },
    setReadme: (
      state,
      action: PayloadAction<NonNullable<GithubState["readme"]>>
    ) => {
      state.readme = action.payload;
      state.introduction = splitReadmeContent(action.payload.content)[0];
    },
    setIntroduction: (state, action: PayloadAction<string>) => {
      state.introduction = action.payload;
    },
  },
});

/** ----- Selectors ----- */
export const selectAccessToken = (state: RootState) => state.github.accessToken;
export const selectUser = (state: RootState) => state.github.user;
export const selectReadme = (state: RootState) => state.github.readme;
export const selectIntroduction = (state: RootState) =>
  state.github.introduction;

/** ----- Actions ----- */
export const {
  setAccessToken,
  clearAccessToken,
  setUser,
  setReadme,
  setIntroduction,
} = githubSlice.actions;

/** ----- Reducer ----- */
export default githubSlice.reducer;
