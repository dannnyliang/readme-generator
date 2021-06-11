function getSizeLevelFromRank(rank: number) {
  switch (rank) {
    case 1:
      return 2;
    case 2:
      return 1;
    case 3:
      return 1;
    case 4:
      return 0;
    case 5:
      return 0;
    default:
      return 0;
  }
}

export type PreviewTrack = {
  rank: number;
  name: string;
  url: string;
  image: string;
  artists: {
    name: string;
  }[];
};

export function getTrackContent(tracks: PreviewTrack[]) {
  const trackCountValid = tracks.length === 5;
  if (!trackCountValid) return "";

  const centeredTracks = [
    tracks[3],
    tracks[1],
    tracks[0],
    tracks[2],
    tracks[4],
  ];

  return `
  <br />
  <h1 align='center'>Top Tracks</h1>
  <p align='center'>
  <ruby>
  ${centeredTracks
    .map(
      (track) => `<!--  No.${track.rank} -->
    <a href="${track.url}">
      <img width="${140 + getSizeLevelFromRank(track.rank) * 30}" src="${
        track.image
      }">
    </a>`
    )
    .join("")}
    <rt>🎗 🥈 🥇 🥉 🎗</rt>
  </ruby>
  </p>
  ${tracks
    .map((track) => {
      const artists = track.artists.map((artist) => artist.name).join(", ");
      return `<p align='center'><a href='${track.url}'>${track.name}</a> - <em>${artists}</em></p>`;
    })
    .join("")}
  `;
}

export type PreviewArtist = {
  rank: number;
  name: string;
  url: string;
  image: string;
};

export function getArtistContent(artists: PreviewArtist[]) {
  const artistCountValid = artists.length === 5;
  if (!artistCountValid) return "";

  const centeredArtists = [
    artists[3],
    artists[1],
    artists[0],
    artists[2],
    artists[4],
  ];
  return `
  <br />
  <h1 align="center">Top Artists</h1>
  <p align='center'>
  <ruby>
    ${centeredArtists
      .map(
        (artist) => `<!--  No.${artist.rank} -->
      <a href="${artist.url}">
        <img width="${140 + getSizeLevelFromRank(artist.rank) * 30}" src="${
          artist.image
        }">
      </a>`
      )
      .join("")}
    <rt>🎗 🥈 🥇 🥉 🎗</rt>
  </ruby>
  </p>

  ${artists
    .map(
      (artist) =>
        `<p align='center'><em><a href='${artist.url}'>${artist.name}</a></em></p>`
    )
    .join("")}
  `;
}

export function getIntroductionContent(intro: string) {
  return `
  <!--  Intro Section -->
  ${intro}
  <!--  Intro Section -->
  `;
}
