import React from 'react';
import PropTypes from 'prop-types';

const If = ({ condition, children }) => (condition ? <div>{children}</div> : <div />);

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default If;
