export async function ask(
  question = "",
  stdin = Deno.stdin,
  stdout = Deno.stdout
) {
  const buf = new Uint8Array(1024);

  await stdout.write(new TextEncoder().encode(question));

  const n = await stdin.read(buf);
  const answer = new TextDecoder().decode(buf.subarray(0, n));

  return answer.trim();
}

export async function getSavedAccessToken() {
  try {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile("access-token.txt");
    return decoder.decode(data)
  } catch (error) {
    if (error.name === "NotFound") {
      return undefined;
    } else {
      throw error
    }
  }
}
