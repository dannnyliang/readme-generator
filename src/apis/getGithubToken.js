import { getLocalStorageToken } from "../utils";
import { isNil } from "ramda";

export default function (key, code) {
  const { githubToken } = getLocalStorageToken();
  if (githubToken) return githubToken;

  if (isNil(code))
    return {
      error: {
        message: "No authorization code provided",
      },
    };

  const {
    REACT_APP_GITHUB_CLIENT_ID,
    REACT_APP_GITHUB_SECRET_ID,
  } = process.env;

  const headers = new Headers();
  headers.append("Accept", "application/json");

  const body = new URLSearchParams();
  body.append("code", code);
  body.append("client_id", REACT_APP_GITHUB_CLIENT_ID);
  body.append("client_secret", REACT_APP_GITHUB_SECRET_ID);

  const requestOptions = {
    method: "POST",
    body,
    headers,
    redirect: "follow",
  };

  return fetch(
    /** {@link https://github.com/isaacs/github/issues/330} */
    "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
    requestOptions
  )
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
