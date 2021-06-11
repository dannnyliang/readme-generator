import { split, tail } from "ramda";

import { PreviewArtist, PreviewTrack } from "./utils/generator";

export const splitReadmeContent = (rawContent: string) => {
  const content = decodeURIComponent(escape(atob(rawContent)));
  if (content.includes("<!--  Intro Section -->")) {
    return tail(split("<!--  Intro Section -->", content));
  }
  return [content];
};

export function trackDataTransformer(items: any[]): PreviewTrack[] {
  return items.map((item, index) => ({
    id: item.id,
    rank: index + 1,
    name: item.name,
    image: item.album.images[0].url,
    url: item.external_urls.spotify,
    artists: item.artists.map((artist: any) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
    })),
  }));
}

export function artistDataTransformer(items: any[]): PreviewArtist[] {
  return items.map((item, index) => ({
    id: item.id,
    image: item.images[0].url,
    name: item.name,
    url: item.external_urls.spotify,
    rank: index + 1,
  }));
}
