import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TIME_RANGE } from "../constants";
import { RootState } from "../redux";
import reducerPath from "../redux/reducerPath";
import selectors from "../redux/selectors";

type TopTracksArgs = {
  limit?: number;
  timeRange?: TIME_RANGE;
};
type TopArtistsArgs = {
  limit?: number;
  timeRange?: TIME_RANGE;
};
export type TopTracksResponse = {
  href: string;
  items: Record<string, any>[];
  limit: number;
  offset: number;
  total: number;
  next: string;
  previous: string;
};
export type TopArtistsResponse = {
  href: string;
  items: Record<string, any>[];
  limit: number;
  offset: number;
  total: number;
  next: string;
  previous: string;
};
export type SpotifyApiError = {
  status: number;
  message: string;
};

export const spotifyApi = createApi({
  reducerPath: reducerPath.apis.spotifyApi,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = selectors.spotify.selectAccessToken(
        getState() as RootState
      );
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<any, void>({
      query: () => "v1/me",
    }),
    getTopTracks: builder.query<TopTracksResponse, TopTracksArgs>({
      query: (args) => {
        const { limit = 5, timeRange = TIME_RANGE.SHORT } = args;
        return `v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`;
      },
    }),
    getTopArtists: builder.query<TopArtistsResponse, TopArtistsArgs>({
      query: (args) => {
        const { limit = 5, timeRange = TIME_RANGE.SHORT } = args;
        return `v1/me/top/artists?limit=${limit}&time_range=${timeRange}`;
      },
    }),
  }),
});

export const { useGetMeQuery, useGetTopTracksQuery, useGetTopArtistsQuery } =
  spotifyApi;
