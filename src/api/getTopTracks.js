export default async function (accessToken) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  const limit = 5

  const response = await fetch(
    /** {@link https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/} */
    `https://api.spotify.com/v1/me/top/tracks?limit=${limit}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });

  if (response.error) {
    throw response.error
  }

  return response;
}
