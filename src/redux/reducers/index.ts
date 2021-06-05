import { combineReducers } from "redux";

import { githubApi } from "../../apis/github";
import github from "./github";

const rootReducer = combineReducers({
  github,
  [githubApi.reducerPath]: githubApi.reducer,
});

export default rootReducer;
