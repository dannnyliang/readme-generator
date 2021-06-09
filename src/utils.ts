import { split, tail } from "ramda";

export const splitReadmeContent = (rawContent: string) => {
  const content = decodeURIComponent(escape(atob(rawContent)));
  if (content.includes("<!--  Intro Section -->")) {
    return tail(split("<!--  Intro Section -->", content));
  }
  return [content];
};
