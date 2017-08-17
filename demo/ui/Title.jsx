import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../index.js';
import { slug } from '../util';

const Title = ({ children }) => (
  <div className='padding-top-large' id={slug(children)}>
    <Text h3 className='text--bold'>{children}</Text>
  </div>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
