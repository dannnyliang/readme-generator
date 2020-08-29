import api from "./api/index.js";
import { ask } from "./utils.js";
import generator from "./generator.js";
import getReadme from "./api/getReadme.js";
import transformer from "./transformer/index.js";
import updateReadme from "./api/updateReadme.js";

const encoder = new TextEncoder();

async function generateReadme() {
  const rawData = await api();
  const data = transformer(rawData);

  const currentReadme = await getReadme();
  const readme = generator(data);

  await Deno.writeFile("./preview.md", encoder.encode(readme));
  let isConfirm = await ask(`Confirm update?[y/n]: `);
  while (isConfirm !== "y" && isConfirm !== "n") {
    isConfirm = await ask(`Confirm update?[y/n](Please input 'y' or 'n'): `);
  }

  if (isConfirm === "y") {
    await updateReadme(readme, currentReadme.sha);
  }

  return;
}

await generateReadme();
