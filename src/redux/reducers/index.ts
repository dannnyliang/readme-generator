import { combineReducers } from "redux";

import { githubApi } from "../../apis/githubApi";
import { githubAppApi } from "../../apis/githubApp";
import { spotifyAppApi } from "../../apis/spotifyApp";
import github from "./github";
import spotify from "./spotify";

const rootReducer = combineReducers({
  github,
  spotify,
  [githubAppApi.reducerPath]: githubAppApi.reducer,
  [githubApi.reducerPath]: githubApi.reducer,
  [spotifyAppApi.reducerPath]: spotifyAppApi.reducer,
});

export default rootReducer;
