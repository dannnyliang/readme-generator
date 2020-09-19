export default async function (key, username) {
  if (!username) return;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${username}/contents/README.md`
    );
    return await response.json();
  } catch (error) {
    return console.error("error", error);
  }
}
