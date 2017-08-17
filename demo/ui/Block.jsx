import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ children, dark, inline }) => {
  const className = [
    'padding-xsmall',
    dark ? 'bg-gray-7' : '',
    inline ? 'inline' : '',
  ].join(' ');
  return (
    <div className={className}>{children}</div>
  );
};

Block.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  inline: PropTypes.bool,
};

Block.defaultProps = {
  dark: false,
  inline: false,
};

export default Block;
