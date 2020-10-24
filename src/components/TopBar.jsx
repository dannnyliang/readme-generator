import {
  AppBar,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";

import AuthGithub from "./AuthGithub";
import AuthSpotify from "./AuthSpotify";
import PropTypes from "prop-types";
import React from "react";
import SubmitModal from "./SubmitModal";
import styled from "styled-components";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function TopBar(props) {
  const { className, submitDisabled, getCommitInfo } = props;
  return (
    <div className={className}>
      <HideOnScroll>
        <AppBar color="default">
          <Toolbar>
            <Typography className="title" variant="h6">
              Readme Generator
            </Typography>
            <AuthSpotify />
            <AuthGithub />
            <SubmitModal
              submitDisabled={submitDisabled}
              getCommitInfo={getCommitInfo}
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  submitDisabled: PropTypes.bool,
  getCommitInfo: PropTypes.func,
};

const StyledTopBar = styled(TopBar)`
  .title {
    flex: 1;
  }
`;

export default StyledTopBar;
