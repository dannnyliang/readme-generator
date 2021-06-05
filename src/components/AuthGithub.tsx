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
} from "@chakra-ui/react";
import { any, isNil } from "ramda";
import { useEffect } from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { AuthResponse, useAccessTokenMutation } from "../apis/github";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import Github from "../icons/Github";
import {
  clearAccessToken,
  selectAccessToken,
  setAccessToken,
} from "../redux/reducers/github";

function getGithubAuthorizeLink() {
  const { REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_REDIRECT_URI } =
    process.env;

  if (any(isNil, [REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_REDIRECT_URI])) {
    return;
  }
  const client_id = REACT_APP_GITHUB_CLIENT_ID;
  const redirect_uri = encodeURIComponent(REACT_APP_GITHUB_REDIRECT_URI!);
  const scope = "read:packages%20write:packages%20repo%20user";

  return `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
}

function AuthGithub() {
  const githubAuthorizeLink = getGithubAuthorizeLink();
  const accessToken = useAppSelector(selectAccessToken);
  const authable = githubAuthorizeLink && !accessToken;

  const dispatch = useAppDispatch();
  const [code] = useQueryParam("code", StringParam);
  const [getAccessToken, { isLoading }] = useAccessTokenMutation();

  useEffect(() => {
    if (accessToken) return;

    const localStorageTokenGithub = window.localStorage.getItem(
      LOCALSTORAGE_TOKEN.GITHUB
    ) as unknown as AuthResponse;
    if (localStorageTokenGithub) {
      dispatch(setAccessToken(localStorageTokenGithub));
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (accessToken) return;

    if (code) {
      getAccessToken({ code }).then((res) => {
        if ("error" in res) {
          console.error(res);
          return;
        }
        dispatch(setAccessToken(res.data));
        window.location.replace("/");
      });
    }
  }, [accessToken, code, dispatch, getAccessToken]);

  const handleClickClear = () => {
    dispatch(clearAccessToken());
  };

  if (!authable) {
    return (
      <Popover trigger="hover" placement="bottom" matchWidth>
        <PopoverTrigger>
          <Box boxSize={8}>
            <Github boxSize={8} />
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
      <LinkOverlay href={githubAuthorizeLink} />
      {isLoading ? <Spinner size="lg" /> : <Github boxSize={8} />}
    </LinkBox>
  );
}

export default AuthGithub;
