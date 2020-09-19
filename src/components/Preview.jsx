import React, { memo } from "react";

import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import { equals } from "ramda";
import marked from "marked";

function Preview(props) {
  const { readmeContent } = props;

  return (
    <Paper style={{ width: "854px", padding: 24, margin: "0 auto" }}>
      <div dangerouslySetInnerHTML={{ __html: marked(readmeContent) }} />
    </Paper>
  );
}

Preview.propTypes = {};

export default memo(Preview, (prevProps, nextProps) =>
  equals(prevProps, nextProps)
);
