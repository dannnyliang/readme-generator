import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { selectAccessToken } from "../redux/reducers/github";
import { RootState } from "..";

export type GithubUser = any;

export const githubApi = createApi({
  reducerPath: "apiGithub",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = selectAccessToken(getState() as RootState);
      if (accessToken) {
        headers.set("Authorization", `token ${accessToken.access_token}`);
        headers.set("Accept", "application/vnd.github.v3+json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<GithubUser, void>({
      query: () => "user",
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery } = githubApi;
