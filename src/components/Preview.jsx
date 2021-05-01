import { Box, Grid, Paper } from "@material-ui/core";
import React, { memo } from "react";

import PropTypes from "prop-types";
import { equals } from "ramda";
import marked from "marked";
import styled from "styled-components";

function Preview(props) {
  const { className, readmeContent } = props;

  return (
    <div className={className}>
      <Grid className="grid-wrapper" container spacing={4}>
        <Grid item xs={3}>
          <Box className="profile-section">Github Profile</Box>
        </Grid>
        <Grid item xs={9}>
          <Paper className="readme-section" variant="outlined">
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: marked(readmeContent) }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Preview.propTypes = {
  className: PropTypes.string,
};

const StyledPreview = styled(Preview)`
  .grid-wrapper {
    margin-top: 0;
    margin-bottom: 0;
  }

  .profile-section {
  }

  .readme-section {
    padding: 24px;
  }
`;

export default memo(StyledPreview, (prevProps, nextProps) =>
  equals(prevProps, nextProps)
);
