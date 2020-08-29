import "https://deno.land/x/dotenv/load.ts";

export default async function (readme, sha) {
  const { GITHUB_ACCESS_TOKEN } = Deno.env.toObject();
  const date = new Date();

  const headers = new Headers();
  headers.append("Authorization", `token ${GITHUB_ACCESS_TOKEN}`);
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    message: `update on ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    committer: { name: "dannnyliang", email: "youchenliang@gmail.com" },
    content: btoa(unescape(encodeURIComponent(readme))),
    sha,
  });

  const requestOptions = {
    method: "PUT",
    headers,
    body,
    redirect: "follow",
  };

  const response = await fetch(
    "https://api.github.com/repos/dannnyliang/dannnyliang/contents/README.md",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  return response;
}
