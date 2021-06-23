# Readme Generator

🌐 [Site](https://stackoverflow-listing.vercel.app/)

Provide a real-time preview markdown editor with [gfm](https://github.github.com/gfm/) style, and can fetch currently favorite artists and tracks from Spotify. You can finally copy plain markdown text or export .md file or directly commit to personnal Readme repository.

## Features
- Real-time preview markdown editor with [gfm](https://github.github.com/gfm/) style
- Mock Github user page and preview personnal Readme
- Spotify, Github OAuth
- [Need Spotify authorization] Fetch currently favorite artists and tracks from Spotify
([Spotify top artists & tracks api](https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/))
- [Need Github Authorization] Fetch personnal Readme repository content
- [Need Github Authorization] Commit to personnal Readme repository
- Copy markdown content
- Export markdown file

## Tools
- UI: [chakra-ui](https://chakra-ui.com/), [styled-component](https://styled-components.com/)
- markdown parser: [marked](https://github.com/markedjs/marked)
- data fetching: [rtk-query](https://redux-toolkit.js.org/rtk-query/overview)
- hoisting: [vercel](https://vercel.com/docs)
