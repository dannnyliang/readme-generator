import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AuthResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

interface AuthArgs {
  code: string;
}

const { REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET_ID } = process.env;

export const githubApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cors-anywhere.herokuapp.com/https://github.com",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    accessToken: builder.mutation<AuthResponse, AuthArgs>({
      query: (args) => {
        return {
          url: "/login/oauth/access_token",
          method: "POST",
          body: {
            code: args.code,
            client_id: REACT_APP_GITHUB_CLIENT_ID,
            client_secret: REACT_APP_GITHUB_SECRET_ID,
          },
        };
      },
    }),
  }),
});

export const { useAccessTokenMutation } = githubApi;
