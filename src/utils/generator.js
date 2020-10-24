import { isEmpty } from "ramda";

function getSizeLevelFromRank(rank) {
  // eslint-disable-next-line default-case
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
  }
}

export default function ({
  tracks: unsortedTracks,
  artists: unsortedArtists,
  intro,
}) {
  const tracks = unsortedTracks.map((track, index) => ({
    ...track,
    rank: index + 1,
  }));
  const artists = unsortedArtists.map((artist, index) => ({
    ...artist,
    rank: index + 1,
  }));

  if (tracks.length !== 5 || artists.length !== 5) {
    return "";
  }

  const centeredTracks = isEmpty(tracks)
    ? []
    : [tracks[3], tracks[1], tracks[0], tracks[2], tracks[4]];
  const centeredArtists = isEmpty(artists)
    ? []
    : [artists[3], artists[1], artists[0], artists[2], artists[4]];

  return `
<p>
  <img width="100%" src="https://raw.githubusercontent.com/dannnyliang/dannnyliang/master/assets/images/stair.jpeg">
</p>
<p align='center'>
  <a href="https://www.facebook.com/dannnyliang">
    <img height="30" src="https://raw.githubusercontent.com/dannnyliang/dannnyliang/master/assets/images/facebook.png">
  </a>
  &nbsp;&nbsp;
  <a href="https://open.spotify.com/user/11167957984?si=FiATh_i1SpydFtFGEsagFA">
    <img height="30" src="https://raw.githubusercontent.com/dannnyliang/dannnyliang/master/assets/images/spotify.png">
  </a>
  &nbsp;&nbsp;
  <a href="https://medium.com/@youchenliang">
    <img height="30" src="https://raw.githubusercontent.com/dannnyliang/dannnyliang/master/assets/images/medium.png">
  </a>
  &nbsp;&nbsp;
</p>

<!--  Intro Section -->
${intro}
<!--  Intro Section -->

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

<br />

<h1 align='center'>Top Artists</h1>
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
