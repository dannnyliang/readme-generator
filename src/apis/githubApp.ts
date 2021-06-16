import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import reducerPath from "../redux/reducerPath";

export type AuthSuccess = {
  access_token: string;
  scope: string;
  token_type: string;
};

type AuthFail = {
  error: string;
  error_description: string;
  error_uri: string;
};

export type AuthResponse = AuthSuccess | AuthFail;

type AuthArgs = {
  code: string;
};

const {
  REACT_APP_GITHUB_CLIENT_ID,
  REACT_APP_GITHUB_SECRET_ID,
  REACT_APP_DEVELOPMENT_PROXY,
  NODE_ENV,
} = process.env;

export const githubAppApi = createApi({
  reducerPath: reducerPath.apis.githubAppApi,
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      NODE_ENV === "development" ? REACT_APP_DEVELOPMENT_PROXY : ""
    }https://github.com`,
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

export const { useAccessTokenMutation } = githubAppApi;
