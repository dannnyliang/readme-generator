import getTopArtists from './getTopArtists.js'
import getTopTracks from './getTopTracks.js'

export default function (rawData) {
  return {
    topTracks: getTopTracks(rawData.topTracks),
    topArtists: getTopArtists(rawData.topArtists)
  }
}
