import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../redux";
import reducerPath from "../redux/reducerPath";
import selectors from "../redux/selectors";

export type GithubUser = Record<string, any>;
export type GithubRepo = Record<string, any>;
type PutReadmeResponse = {
  commit: Record<string, any>;
  content: Record<string, any>;
};
type PutReadmeArgs = {
  message: string;
  content: string;
  sha: string;
  commiter: {
    name: string;
    email: string;
  };
};

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
    putReadme: builder.mutation<PutReadmeResponse, PutReadmeArgs>({
      query: (args) => {
        const username = args.commiter.name;
        return {
          url: `https://api.github.com/repos/${username}/${username}/contents/README.md`,
          method: "PUT",
          body: args,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useGetReadmeQuery, usePutReadmeMutation } =
  githubApi;
