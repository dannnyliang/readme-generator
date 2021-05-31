import { map, pipe, prop, take } from "ramda";

import queryString from "query-string";

export function getSpotifyAuthorizeLink() {
  const {
    REACT_APP_SPOTIFY_CLIENT_ID,
    REACT_APP_SPOTIFY_SECRET_ID,
    REACT_APP_SPOTIFY_REDIRECT_URI,
  } = process.env;

  if (!REACT_APP_SPOTIFY_CLIENT_ID || !REACT_APP_SPOTIFY_SECRET_ID) {
    return undefined;
  }

  const client_id = REACT_APP_SPOTIFY_CLIENT_ID;
  const response_type = "code";
  const redirect_uri = encodeURIComponent(REACT_APP_SPOTIFY_REDIRECT_URI);
  const scope = "user-read-recently-played%20user-top-read";

  return `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;
}

export function getGithubAuthorizeLink() {
  const {
    REACT_APP_GITHUB_CLIENT_ID,
    REACT_APP_GITHUB_REDIRECT_URI,
  } = process.env;

  const client_id = REACT_APP_GITHUB_CLIENT_ID;
  const redirect_uri = encodeURIComponent(REACT_APP_GITHUB_REDIRECT_URI);
  const scope = "read:packages%20write:packages%20repo%20user";

  return `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
}

export function getLocalStorageToken() {
  const spotifyToken = JSON.parse(window.localStorage.getItem("spotifyToken"));
  const githubToken = JSON.parse(window.localStorage.getItem("githubToken"));
  return { spotifyToken, githubToken };
}

export const getDefaultSelection = pipe(take(5), map(prop("id")));

export function getAuthorizationCode(service) {
  if (!window.location.pathname.includes(service)) return;

  const { code } = queryString.parse(window.location.search);
  return code;
}
