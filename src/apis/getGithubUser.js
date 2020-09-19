export default async function (key, token) {
  if (!token?.access_token) return;

  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    return await response.json();
  } catch (error) {
    return console.error("error", error);
  }
}
