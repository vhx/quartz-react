import React from 'react';
import PropTypes from 'prop-types';

const Details = ({ children, withDemo }) => (
  <div className={`text--gray details ${withDemo ? 'padding-vert-medium' : 'padding-top-large'}`}>{children}</div>
);

Details.propTypes = {
  children: PropTypes.node.isRequired,
  withDemo: PropTypes.bool,
};

Details.defaultProps = {
  withDemo: false,
};

export default Details;
