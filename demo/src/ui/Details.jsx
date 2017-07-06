import React from 'react';
import PropTypes from 'prop-types';

const Details = ({ children }) => (
  <div className='padding-top-large text--gray details'>{children}</div>
);

Details.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Details;
