import { Box, Container } from "@chakra-ui/react";
import { isNil } from "ramda";

import { useGetReadmeQuery, useGetUserQuery } from "./apis/githubApi";
import { useGetTopArtistsQuery, useGetTopTracksQuery } from "./apis/spotifyApi";
import NavBar from "./components/NavBar";
import SectionIntro from "./components/SectionIntro";
import SectionPreview from "./components/SectionPreview";
import { TIME_RANGE } from "./constants";
import { useAppSelector } from "./hooks";
import selectors from "./redux/selectors";

function App() {
  const githubAccessToken = useAppSelector(selectors.github.selectAccessToken);
  const spotifyAccessToken = useAppSelector(
    selectors.spotify.selectAccessToken
  );
  const user = useAppSelector(selectors.github.selectUser);

  useGetTopTracksQuery(
    {
      limit: 5,
      timeRange: TIME_RANGE.SHORT,
    },
    {
      skip: isNil(spotifyAccessToken),
    }
  );
  useGetTopArtistsQuery(
    {
      limit: 5,
      timeRange: TIME_RANGE.SHORT,
    },
    {
      skip: isNil(spotifyAccessToken),
    }
  );
  useGetUserQuery(undefined, {
    skip: isNil(githubAccessToken),
  });
  useGetReadmeQuery(user?.login, {
    skip: isNil(user),
  });

  return (
    <Box bgColor="gray.50">
      <NavBar />
      <Container maxW="container.xl">
        <SectionIntro />
        <SectionPreview />
      </Container>
    </Box>
  );
}

export default App;
