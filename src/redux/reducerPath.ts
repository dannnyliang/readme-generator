const reducerPath = {
  reducers: {
    github: "github",
    spotify: "spotify",
  },
  apis: {
    githubAppApi: "apiGithubApp",
    githubApi: "apiGithub",
    spotifyAppApi: "apiSpotifyApp",
    spotifyApi: "apiSpotify",
  },
} as const;

export default reducerPath;
