import { combineReducers } from "redux";

import { githubApi } from "../../apis/github";
import { spotifyApi } from "../../apis/spotify";
import github from "./github";
import spotify from "./spotify";

const rootReducer = combineReducers({
  github,
  spotify,
  [githubApi.reducerPath]: githubApi.reducer,
  [spotifyApi.reducerPath]: spotifyApi.reducer,
});

export default rootReducer;
