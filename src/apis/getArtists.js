import { TIME_RANGE } from "../constants";

export default async function (key, { token, params = {} }) {
  if (!token?.access_token) return;
  const { limit = 5, timeRange = TIME_RANGE.SHORT } = params;

  try {
    const response = await fetch(
      /** {@link https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/} */
      `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    return console.error("error", error);
  }
}
