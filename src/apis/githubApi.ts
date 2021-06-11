import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../redux";
import reducerPath from "../redux/reducerPath";
import selectors from "../redux/selectors";

export type GithubUser = Record<string, any>;
export type GithubRepo = Record<string, any>;

export const githubApi = createApi({
  reducerPath: reducerPath.apis.githubApi,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = selectors.github.selectAccessToken(
        getState() as RootState
      );
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
    getReadme: builder.query<GithubRepo, string>({
      query: (username) => `repos/${username}/${username}/contents/README.md`,
    }),
  }),
});

export const { useGetUserQuery, useGetReadmeQuery } = githubApi;
