import { getDefaultSelection, getLocalStorageToken } from "../utils";

import { artistDataTransformer } from "../components/ArtistTable";
import getArtists from "../apis/getArtists";
import { useQuery } from "react-query";

export default (params) => {
  const { handleSetArtistIds } = params;
  const { spotifyToken } = getLocalStorageToken();

  const response = useQuery(
    ["getArtists", { token: spotifyToken, params: { limit: 10 } }],
    getArtists,
    {
      retry: false,
      onSuccess: (data) => {
        if (data) {
          handleSetArtistIds(
            getDefaultSelection(artistDataTransformer(data.items))
          );
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return {
    ...response,
    artists: response.data?.items
      ? artistDataTransformer(response.data.items)
      : [],
  };
};
