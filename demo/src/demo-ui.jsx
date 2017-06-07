import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../index.js';

export const Section = ({ children, title }) => (
  <div className='padding-large border-bottom'>
    <div className='padding-bottom-medium'>
      <Text h3>{title}</Text>
    </div>
    <div>{children}</div>
  </div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export const Block = ({ children, dark, inline }) => {
  const className = [
    'padding-small',
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

export const Subtitle = ({ children }) => (
  <Block><Text h5>{children}</Text></Block>
);

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};
