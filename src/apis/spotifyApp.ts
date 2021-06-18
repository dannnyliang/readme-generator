import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import reducerPath from "../redux/reducerPath";

export type AuthSuccess = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type AuthFail = {
  error: string;
  error_description: string;
};

export type AuthResponse = AuthSuccess | AuthFail;

interface AuthArgs {
  code: string;
}

const {
  REACT_APP_SPOTIFY_CLIENT_ID,
  REACT_APP_SPOTIFY_SECRET_ID,
  REACT_APP_SPOTIFY_REDIRECT_URI,
} = process.env;

export const spotifyAppApi = createApi({
  reducerPath: reducerPath.apis.spotifyAppApi,
  baseQuery: fetchBaseQuery({
    baseUrl: `https://accounts.spotify.com/api`,
    prepareHeaders: (headers) => {
      const authorizationCode = btoa(
        `${REACT_APP_SPOTIFY_CLIENT_ID}:${REACT_APP_SPOTIFY_SECRET_ID}`
      );
      headers.set("Authorization", `Basic ${authorizationCode}`);
      headers.set("Content-Type", "application/x-www-form-urlencoded");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    accessToken: builder.mutation<AuthResponse, AuthArgs>({
      query: (args) => {
        const body = new URLSearchParams();
        body.append("grant_type", "authorization_code");
        body.append("code", args.code);
        body.append("redirect_uri", REACT_APP_SPOTIFY_REDIRECT_URI!);

        return {
          url: "/token",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAccessTokenMutation } = spotifyAppApi;
