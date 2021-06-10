import {
  Box,
  Button,
  LinkBox,
  LinkOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { any, isNil } from "ramda";
import { useEffect } from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { useAccessTokenMutation } from "../apis/spotifyApp";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import Spotify from "../icons/Spotify";
import {
  clearAccessToken,
  selectAccessToken,
  setAccessToken,
} from "../redux/reducers/spotify";

function getSpotifyAuthorizeLink() {
  const {
    REACT_APP_SPOTIFY_CLIENT_ID,
    REACT_APP_SPOTIFY_SECRET_ID,
    REACT_APP_SPOTIFY_REDIRECT_URI,
  } = process.env;

  if (
    any(isNil, [
      REACT_APP_SPOTIFY_CLIENT_ID,
      REACT_APP_SPOTIFY_SECRET_ID,
      REACT_APP_SPOTIFY_REDIRECT_URI,
    ])
  ) {
    return;
  }

  const client_id = REACT_APP_SPOTIFY_CLIENT_ID;
  const response_type = "code";
  const redirect_uri = encodeURIComponent(REACT_APP_SPOTIFY_REDIRECT_URI!);
  const scope = "user-read-recently-played%20user-top-read";

  return `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;
}

function AuthSpotify() {
  const spotifyAuthorizeLink = getSpotifyAuthorizeLink();
  const accessToken = useAppSelector(selectAccessToken);
  const authable = spotifyAuthorizeLink && !accessToken;

  const toast = useToast();
  const dispatch = useAppDispatch();
  const [code] = useQueryParam("code", StringParam);
  const [getAccessToken, { isLoading }] = useAccessTokenMutation();

  useEffect(() => {
    if (accessToken) return;

    const localStorageTokenSpotify = window.localStorage.getItem(
      LOCALSTORAGE_TOKEN.SPOTIFY
    );
    if (localStorageTokenSpotify) {
      dispatch(setAccessToken(JSON.parse(localStorageTokenSpotify)));
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (accessToken) return;

    if (code && window.location.pathname.includes("spotify")) {
      getAccessToken({ code }).then((res) => {
        if ("error" in res) {
          console.error(res);
          toast({
            title: "登入 Spotify 失敗",
            status: "error",
            isClosable: true,
          });
          return;
        }
        dispatch(setAccessToken(res.data));
        window.location.replace("/");
      });
    }
  }, [accessToken, code, dispatch, getAccessToken, toast]);

  const handleClickClear = () => {
    dispatch(clearAccessToken());
  };

  if (!authable) {
    return (
      <Popover trigger="hover" placement="bottom" matchWidth>
        <PopoverTrigger>
          <Box boxSize={8}>
            <Spotify boxSize={8} />
          </Box>
        </PopoverTrigger>
        <PopoverContent width="unset">
          <PopoverArrow />
          <PopoverBody>
            <Box>
              <Button
                variant="outline"
                colorScheme="red"
                onClick={handleClickClear}
              >
                Clear Auth
              </Button>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <LinkBox alignItems="center">
      <LinkOverlay href={spotifyAuthorizeLink} />
      {isLoading ? <Spinner size="lg" /> : <Spotify boxSize={8} />}
    </LinkBox>
  );
}

export default AuthSpotify;
