import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import reducerPath from "../redux/reducerPath";

export type AuthSuccess = {
  access_token: string;
  scope: string;
  token_type: string;
};

export type AuthFail = {
  error: string;
  error_description: string;
  error_uri: string;
};

export type AuthResponse = AuthSuccess | AuthFail;

type AuthArgs = {
  code: string;
};

const { REACT_APP_API_HOST } = process.env;

export const githubAppApi = createApi({
  reducerPath: reducerPath.apis.githubAppApi,
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_API_HOST}`,
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    accessToken: builder.mutation<AuthResponse, AuthArgs>({
      query: (args) => `github-token?code=${args.code}`,
    }),
  }),
});

export const { useAccessTokenMutation } = githubAppApi;
