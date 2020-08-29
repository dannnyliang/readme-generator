import authorize from "./authorize.js";
import getToken from "./getToken.js";
import getTopArtists from "./getTopArtists.js";
import getTopTracks from "./getTopTracks.js";

async function getData(accessToken) {
  return {
    topTracks: await getTopTracks(accessToken),
    topArtists: await getTopArtists(accessToken),
  };
}

export default async function () {
  const code = await authorize();
  const tokenObject = await getToken(code);
  const accessToken = tokenObject.access_token;

  const data = await getData(accessToken);

  return data;
}
