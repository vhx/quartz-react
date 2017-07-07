import React from 'react';
import PropTypes from 'prop-types';

const If = ({ condition, children, inline }) => {
  const el = inline ? React.createFactory('span') : React.createFactory('div');
  return (condition ? el(null, children) : <span />);
};

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
};

If.defaultProps = {
  inline: false,
};

export default If;
