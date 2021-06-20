const reducerPath = {
  reducers: {
    github: "github",
    spotify: "spotify",
    error: "error",
  },
  apis: {
    githubAppApi: "apiGithubApp",
    githubApi: "apiGithub",
    spotifyAppApi: "apiSpotifyApp",
    spotifyApi: "apiSpotify",
  },
} as const;

export default reducerPath;
