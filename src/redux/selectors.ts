import { name as githubReducerName } from "./reducers/github";
import { name as spotifyReducerName } from "./reducers/spotify";
import { RootState } from "..";

const selectors = {
  [spotifyReducerName]: {
    selectAccessToken: (state: RootState) => state.spotify.accessToken,
  },
  [githubReducerName]: {
    selectAccessToken: (state: RootState) => state.github.accessToken,
    selectUser: (state: RootState) => state.github.user,
    selectReadme: (state: RootState) => state.github.readme,
    selectIntroduction: (state: RootState) => state.github.introduction,
  },
};

export default selectors;
