import { getLocalStorageToken } from "../utils";
import { isNil } from "ramda";

export const isTokenExpired = (validTime) =>
  new Date(validTime).getTime() < Date.now();

export default async function (key, code) {
  const { spotifyToken } = getLocalStorageToken();
  if (spotifyToken && !isTokenExpired(spotifyToken.validTime)) {
    return spotifyToken;
  }

  if (isNil(code))
    return {
      error: {
        message: "No authorization code provided",
      },
    };
  window.localStorage.removeItem("spotifyToken");

  const {
    REACT_APP_SPOTIFY_CLIENT_ID,
    REACT_APP_SPOTIFY_SECRET_ID,
    REACT_APP_SPOTIFY_REDIRECT_URI,
  } = process.env;

  const BASIC_AUTHORIZATION_CODE = btoa(
    `${REACT_APP_SPOTIFY_CLIENT_ID}:${REACT_APP_SPOTIFY_SECRET_ID}`
  );

  const headers = new Headers();
  headers.append("Authorization", `Basic ${BASIC_AUTHORIZATION_CODE}`);
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("code", code);
  body.append("redirect_uri", REACT_APP_SPOTIFY_REDIRECT_URI);

  const requestOptions = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };

  return fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then((res) => res.json())
    .then((res) =>
      res.error
        ? {
            error: {
              message: res.error_description,
            },
          }
        : res
    );
}
