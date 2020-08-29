export default function (rawData) {
  const artists = rawData.items.map((item, index) => ({
    image: item.images[0].url,
    name: item.name,
    url: item.external_urls.spotify,
    rank: index + 1
  }));

  return artists;
}
