export default async function ({ message, token, readme, sha, user }) {
  if (!token?.access_token || !user?.login || !user?.email) return;

  try {
    const response = await fetch(
      "https://api.github.com/repos/dannnyliang/dannnyliang/contents/README.md",
      {
        method: "PUT",
        headers: {
          Authorization: `token ${token.access_token}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message,
          committer: { name: user.login, email: user.email },
          content: btoa(unescape(encodeURIComponent(readme))),
          sha,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    return console.error("error", error);
  }
}
