export default async function (key, token) {
  if (!token?.access_token) return;

  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token.access_token}`,
      Accept: "application/vnd.github.v3+json",
    },
  }).then((res) => res.json());

  if (response.error) {
    throw response;
  }

  return response;
}
