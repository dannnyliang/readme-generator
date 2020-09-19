import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { getSpotifyAuthorizeLink } from "../utils";
import getSpotifyToken from "../apis/getSpotifyToken";
import queryString from "query-string";
import { useQuery } from "react-query";

function AuthSpotify() {
  const { code } = queryString.parse(window.location.search);
  const authorizeLink = getSpotifyAuthorizeLink();

  useQuery(["getSpotifyToken", code], getSpotifyToken, {
    onSuccess: (data) => {
      if (!data.error) {
        /** side effect */
        window.localStorage.setItem("spotifyToken", JSON.stringify(data));
      }
    },
  });

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={!authorizeLink}
      href={authorizeLink}
    >
      auth spotify!
    </Button>
  );
}

AuthSpotify.propTypes = {};

export default AuthSpotify;
