/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';


const Avatar = props => (
  <span className={`avatar color-teal avatar--${props.size}`}>
    <span className='default-avatar'>{props.initial}</span>
    <span
      className='avatar-user user-avatar'
      style={{
        backgroundImage: `url('${props.image}')`,
      }}
    />

  </span>
);

const sizes = [ 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ];

Avatar.propTypes = {
  size: PropTypes.oneOf(sizes),
  image: PropTypes.string,
  initial: PropTypes.string,
};

Avatar.defaultProps = {
  size: 'medium',
  image: '',
  initial: '',
};

Avatar.propDescriptions = {
  size: `One of: ["${sizes.join('", "')}"]`,
};

export default Avatar;
