import { getLocalStorageToken } from "../utils";
import getTracks from "../apis/getTracks";
import { trackDataTransformer } from "../components/TrackTable";
import { useQuery } from "react-query";

export default () => {
  const { spotifyToken } = getLocalStorageToken();

  const response = useQuery(
    ["getTracks", { token: spotifyToken, params: { limit: 5 } }],
    getTracks,
    {
      retry: false,
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
