import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import React, { memo, useEffect } from "react";
import {
  getAuthorizationCode,
  getLocalStorageToken,
  getSpotifyAuthorizeLink,
} from "../utils";
import getSpotifyToken, { isTokenExpired } from "../apis/getSpotifyToken";

import PropTypes from "prop-types";
import Spotify from "../icons/Spotify";
import { isNil } from "ramda";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";

function AuthSpotify(props) {
  const { className } = props;
  const code = getAuthorizationCode("spotify");
  const { spotifyToken } = getLocalStorageToken();

  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useQuery(
    ["getSpotifyToken", code],
    getSpotifyToken,
    {
      enabled: !isNil(code),
      onSuccess: (data) => {
        if (data.error) {
          enqueueSnackbar(`Spotify: ${data.error.message}`, {
            variant: "error",
          });
        }
      },
    }
  );

  useEffect(() => {
    if (data && !data.error && !spotifyToken) {
      window.localStorage.setItem(
        "spotifyToken",
        JSON.stringify({
          ...data,
          validTime: new Date(
            Date.now() + data.expires_in * 1000
          ).toISOString(),
        })
      );
      window.location.replace("/");
    }
  }, [data, spotifyToken]);

  return (
    <div className={className}>
      <Tooltip title="Auth Spotify">
        <a
          href={
            spotifyToken && !isTokenExpired(spotifyToken.validTime)
              ? "/"
              : getSpotifyAuthorizeLink()
          }
        >
          <IconButton>
            {isLoading ? <CircularProgress /> : <Spotify />}
          </IconButton>
        </a>
      </Tooltip>
    </div>
  );
}

AuthSpotify.propTypes = {
  className: PropTypes.string,
};

const StyledAuthSpotify = styled(AuthSpotify)`
  svg {
    width: 32px;
    height: 32px;
  }
`;

export default memo(StyledAuthSpotify);
