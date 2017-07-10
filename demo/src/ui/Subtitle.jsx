import React from 'react';
import PropTypes from 'prop-types';
import Block from './Block.jsx';
import { Text } from '../../../index.js';

const Subtitle = ({ children }) => (
  <Block><Text block className='margin-bottom-medium padding-bottom-small border-bottom border--gray-light text--bold text--gray'>{children}</Text></Block>
);

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Subtitle;
