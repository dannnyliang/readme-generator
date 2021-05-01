import { Divider, Typography } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

function Section(props) {
  const { className, title, children, showDivider = true } = props;

  return (
    <div className={className}>
      <Typography variant="h4">{title}</Typography>
      <>{children}</>
      {showDivider && <Divider className="divider" />}
    </div>
  );
}

Section.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType(
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ),
  showDivider: PropTypes.bool,
};

const StyledSection = styled(Section)`
  .divider {
    margin: 32px 0;
  }
`;

export default StyledSection;
