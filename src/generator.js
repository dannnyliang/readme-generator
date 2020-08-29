function getSizeLevelFromRank(rank) {
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

export default function (data) {
  const { topTracks, topArtists } = data;

  const centeredTracks = [
    topTracks[3],
    topTracks[1],
    topTracks[0],
    topTracks[2],
    topTracks[4],
  ];

  const centeredArtists = [
    topArtists[3],
    topArtists[1],
    topArtists[0],
    topArtists[2],
    topArtists[4],
  ];

  return `
<img src="https://raw.githubusercontent.com/dannnyliang/dannnyliang/master/assets/images/stair.jpeg">
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

Hi there 👋 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat, nulla quis fermentum eleifend, nibh urna tincidunt quam, vel sodales diam sem in augue. Maecenas lacinia mi enim, ac fermentum

Sharing my favorite tracks and artists. Welcome to follow my playlist.

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

${topTracks
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

${topArtists
  .map(
    (artist) =>
      `<p align='center'><em><a href='${artist.url}'>${artist.name}</a></em></p>`
  )
  .join("")}
  `;
}
