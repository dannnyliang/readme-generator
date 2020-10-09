import { getDefaultSelection, getLocalStorageToken } from "../utils";

import getTracks from "../apis/getTracks";
import { trackDataTransformer } from "../components/TrackTable";
import { useQuery } from "react-query";

export default (params) => {
  const { handleSetTrackIds } = params;
  const { spotifyToken } = getLocalStorageToken();

  const response = useQuery(
    ["getTracks", { token: spotifyToken, params: { limit: 10 } }],
    getTracks,
    {
      retry: false,
      onSuccess: (data) => {
        if (data) {
          handleSetTrackIds(
            getDefaultSelection(trackDataTransformer(data.items))
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
    tracks: response.data?.items
      ? trackDataTransformer(response.data.items)
      : [],
  };
};
