import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TIME_RANGE } from "../constants";
import { selectAccessToken } from "../redux/reducers/spotify";
import { RootState } from "..";

type TopTracksArgs = {
  limit?: number;
  timeRange?: TIME_RANGE;
};
type TopArtistsArgs = {
  limit?: number;
  timeRange?: TIME_RANGE;
};
export type TopTracksResponse = Record<string, any>;
export type TopArtistsResponse = Record<string, any>;

export const spotifyApi = createApi({
  reducerPath: "apiSpotify",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = selectAccessToken(getState() as RootState);
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
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

export const { useGetTopTracksQuery, useGetTopArtistsQuery } = spotifyApi;
