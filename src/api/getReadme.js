import "https://deno.land/x/dotenv/load.ts";

export default async function () {
  const { GITHUB_ACCESS_TOKEN } = Deno.env.toObject();

  const headers = new Headers();
  headers.append("Authorization", `token ${GITHUB_ACCESS_TOKEN}`);

  const requestOptions = {
    method: "GET",
    headers,
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
