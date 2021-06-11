import reducerPath from "./reducerPath";
import { RootState } from ".";

const selectors = {
  [reducerPath.reducers.spotify]: {
    selectAccessToken: (state: RootState) => state.spotify.accessToken,
    selectTracks: (state: RootState) => state.spotify.tracks,
    selectArtists: (state: RootState) => state.spotify.artists,
    selectTrackContent: (state: RootState) => state.spotify.trackContent,
    selectArtistContent: (state: RootState) => state.spotify.artistContent,
  },
  [reducerPath.reducers.github]: {
    selectAccessToken: (state: RootState) => state.github.accessToken,
    selectUser: (state: RootState) => state.github.user,
    selectReadme: (state: RootState) => state.github.readme,
    selectIntroduction: (state: RootState) => state.github.introduction,
  },
};

export default selectors;
