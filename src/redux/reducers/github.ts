import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GithubUser, githubApi } from "../../apis/githubApi";
import { AuthSuccess } from "../../apis/githubApp";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { splitReadmeContent } from "../../utils";
import reducerPath from "../reducerPath";

type GithubState = {
  accessToken?: AuthSuccess;
  user?: GithubUser;
  readme?: {
    content: string;
    sha: string;
  };
  introduction: string;
};

const initialState: GithubState = {
  introduction: "",
};

const githubSlice = createSlice({
  name: reducerPath.reducers.github,
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
    setIntroduction: (state, action: PayloadAction<string>) => {
      state.introduction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        githubApi.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
        }
      )
      .addMatcher(
        githubApi.endpoints.getReadme.matchFulfilled,
        (state, { payload }) => {
          state.readme = {
            sha: payload.sha,
            content: payload.content,
          };
          state.introduction = splitReadmeContent(payload.content)[0];
        }
      );
  },
});

/** ----- Actions ----- */
export const { setAccessToken, clearAccessToken, setIntroduction } =
  githubSlice.actions;

/** ----- Reducer ----- */
export default githubSlice.reducer;
