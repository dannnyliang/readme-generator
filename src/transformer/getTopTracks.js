export default function (rawData) {
  const tracks = rawData.items.map((item, index) => ({
    image: item.album.images[0].url,
    artists: item.artists.map((artist) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
    })),
    name: item.name,
    preview: item.preview_url,
    url: item.external_urls.spotify,
    rank: index + 1
  }));

  return tracks;
}
