import { Box, Container, useToast } from "@chakra-ui/react";
import { isNil } from "ramda";
import { useEffect } from "react";

import { useGetReadmeQuery, useGetUserQuery } from "./apis/githubApi";
import {
  SpotifyApiError,
  useGetMeQuery,
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
} from "./apis/spotifyApi";
import NavBar from "./components/NavBar";
import SectionIntro from "./components/SectionIntro";
import SectionPreview from "./components/SectionPreview";
import { TIME_RANGE } from "./constants";
import { useAppDispatch, useAppSelector } from "./hooks";
import { addError } from "./redux/reducers/error";
import selectors from "./redux/selectors";

function App() {
  const toast = useToast();
  const errors = useAppSelector(selectors.error.selectErrors);
  const dispatch = useAppDispatch();

  const githubAccessToken = useAppSelector(selectors.github.selectAccessToken);
  const spotifyAccessToken = useAppSelector(
    selectors.spotify.selectAccessToken
  );
  const user = useAppSelector(selectors.github.selectUser);

  const { data: spotifyUser, error: spotifyUserError } = useGetMeQuery();

  useGetTopTracksQuery(
    {
      limit: 5,
      timeRange: TIME_RANGE.SHORT,
    },
    {
      skip: isNil(spotifyAccessToken) || isNil(spotifyUser),
    }
  );
  useGetTopArtistsQuery(
    {
      limit: 5,
      timeRange: TIME_RANGE.SHORT,
    },
    {
      skip: isNil(spotifyAccessToken) || isNil(spotifyUser),
    }
  );
  useGetUserQuery(undefined, {
    skip: isNil(githubAccessToken),
  });
  useGetReadmeQuery(user?.login, {
    skip: isNil(user),
  });

  useEffect(() => {
    if (spotifyUserError && "data" in spotifyUserError) {
      const errorContent = spotifyUserError.data as SpotifyApiError;
      const newError = {
        title: "Fetch Spotify api fail",
        message: errorContent.message,
        info: errorContent,
      };
      dispatch(addError(newError));
    }
  }, [dispatch, spotifyUserError]);

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast({
          title: error.title,
          status: "error",
          isClosable: true,
        });
      });
    }
  }, [errors, toast]);

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
