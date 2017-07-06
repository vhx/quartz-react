import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../../index.js';

const Title = ({ children }) => (
  <div className='padding-top-large' id={children}>
    <Text h3 className='text--bold'>{children}</Text>
  </div>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
