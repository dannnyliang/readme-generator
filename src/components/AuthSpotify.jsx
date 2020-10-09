import { IconButton, Tooltip } from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";
import Spotify from "../icons/Spotify";
import { getSpotifyAuthorizeLink } from "../utils";
import getSpotifyToken from "../apis/getSpotifyToken";
import queryString from "query-string";
import styled from "styled-components";
import { useQuery } from "react-query";

function AuthSpotify(props) {
  const { className } = props;
  const { code } = queryString.parse(window.location.search);

  useQuery(["getSpotifyToken", code], getSpotifyToken, {
    onSuccess: (data) => {
      if (!data.error) {
        /** side effect */
        window.localStorage.setItem("spotifyToken", JSON.stringify(data));
      }
    },
  });

  return (
    <div className={className}>
      <Tooltip title="Auth Spotify">
        <a href={getSpotifyAuthorizeLink()}>
          <IconButton>
            <Spotify />
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

export default StyledAuthSpotify;
