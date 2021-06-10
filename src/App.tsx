import { Box, Container } from "@chakra-ui/react";
import { isNil } from "ramda";
import { useEffect } from "react";

import { useGetReadmeQuery, useGetUserQuery } from "./apis/githubApi";
import {
  spotifyApi,
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
} from "./apis/spotifyApi";
import NavBar from "./components/NavBar";
import SectionIntro from "./components/SectionIntro";
import SectionPreview from "./components/SectionPreview";
import { TIME_RANGE } from "./constants";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setReadme, setUser } from "./redux/reducers/github";
import selectors from "./redux/selectors";

function App() {
  const dispatch = useAppDispatch();
  const githubAccessToken = useAppSelector(selectors.github.selectAccessToken);
  const spotifyAccessToken = useAppSelector(
    selectors.spotify.selectAccessToken
  );
  const user = useAppSelector(selectors.github.selectUser);
  const readme = useAppSelector(selectors.github.selectReadme);

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
  const { data: dataUser } = useGetUserQuery(undefined, {
    skip: isNil(githubAccessToken),
  });
  const { data: dataReadme } = useGetReadmeQuery(user?.login, {
    skip: isNil(user),
  });

  useEffect(() => {
    if (!user && dataUser) {
      dispatch(setUser(dataUser));
    }
  }, [dataUser, dispatch, user]);

  useEffect(() => {
    if (!readme && dataReadme) {
      dispatch(
        setReadme({
          sha: dataReadme.sha,
          content: dataReadme.content,
        })
      );
    }
  }, [dataReadme, dispatch, readme]);

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
