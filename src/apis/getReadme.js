export default async function (key, username) {
  if (!username) return;

  const response = await fetch(
    `https://api.github.com/repos/${username}/${username}/contents/README.md`
  ).then((res) => res.json());

  if (response.error) {
    throw response;
  }

  return response;
}
