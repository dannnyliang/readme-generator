import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import React, { memo, useEffect } from "react";
import {
  getAuthorizationCode,
  getGithubAuthorizeLink,
  getLocalStorageToken,
} from "../utils";

import Github from "../icons/Github";
import PropTypes from "prop-types";
import getGithubToken from "../apis/getGithubToken";
import { isNil } from "ramda";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";

function AuthGithub(props) {
  const { className } = props;
  const { githubToken } = getLocalStorageToken();
  const code = getAuthorizationCode("github");

  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useQuery(
    ["getGithubToken", code],
    getGithubToken,
    {
      enabled: !isNil(code),
      onSuccess: (data) => {
        if (data.error) {
          enqueueSnackbar(`Github: ${data.error.message}`, {
            variant: "error",
          });
        }
      },
    }
  );

  useEffect(() => {
    if (data && !data.error && !githubToken) {
      window.localStorage.setItem("githubToken", JSON.stringify(data));
      window.location.replace("/");
    }
  }, [data, githubToken]);

  return (
    <div className={className}>
      <Tooltip title="Auth Spotify">
        <a href={githubToken ? "/" : getGithubAuthorizeLink()}>
          <IconButton>
            {isLoading ? <CircularProgress /> : <Github />}
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

export default memo(StyledAuthGithub);
