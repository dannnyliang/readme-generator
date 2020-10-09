import { IconButton, Tooltip } from "@material-ui/core";

import Github from "../icons/Github";
import PropTypes from "prop-types";
import React from "react";
import { getGithubAuthorizeLink } from "../utils";
import getGithubToken from "../apis/getGithubToken";
import queryString from "query-string";
import styled from "styled-components";
import { useQuery } from "react-query";

function AuthGithub(props) {
  const { className } = props;
  const { code } = queryString.parse(window.location.search);

  useQuery(["getGithubToken", code], getGithubToken, {
    onSuccess: (data) => {
      if (data && !data.error) {
        /** side effect */
        window.localStorage.setItem("githubToken", JSON.stringify(data));
      }
    },
  });

  return (
    <div className={className}>
      <Tooltip title="Auth Spotify">
        <a href={getGithubAuthorizeLink()}>
          <IconButton>
            <Github />
          </IconButton>
        </a>
      </Tooltip>
    </div>
  );
}

AuthGithub.propTypes = {
  className: PropTypes.string,
};

const StyledAuthGithub = styled(AuthGithub)`
  svg {
    width: 32px;
    height: 32px;
  }
`;

export default StyledAuthGithub;
