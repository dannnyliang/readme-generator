import React, { memo } from "react";

import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { getGithubAuthorizeLink } from "../utils";
import getGithubToken from "../apis/getGithubToken";
import queryString from "query-string";
import { useQuery } from "react-query";

function AuthGithub() {
  const { code } = queryString.parse(window.location.search);
  const authorizeLink = getGithubAuthorizeLink();

  useQuery(["getGithubToken", code], getGithubToken, {
    onSuccess: (data) => {
      if (data && !data.error) {
        /** side effect */
        window.localStorage.setItem("githubToken", JSON.stringify(data));
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
      auth github!
    </Button>
  );
}

AuthGithub.propTypes = {};

export default memo(AuthGithub);
