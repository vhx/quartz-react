import React from 'react';
import PropTypes from 'prop-types';

const If = ({ condition, children, inline }) => (condition ? <span className={inline ? '' : 'block'}>{children}</span> : <span />);

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
};

If.defaultProps = {
  inline: false,
};

export default If;
