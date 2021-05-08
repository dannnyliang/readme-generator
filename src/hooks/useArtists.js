import { artistDataTransformer } from "../components/ArtistTable";
import getArtists from "../apis/getArtists";
import { getLocalStorageToken } from "../utils";
import { useQuery } from "react-query";

export default () => {
  const { spotifyToken } = getLocalStorageToken();

  const response = useQuery(
    ["getArtists", { token: spotifyToken, params: { limit: 5 } }],
    getArtists,
    {
      retry: false,
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
