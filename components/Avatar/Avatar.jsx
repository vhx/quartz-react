/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';


const Avatar = props => (
  <span className={`avatar color-teal avatar--${props.size}`}>
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
};

Avatar.defaultProps = {
  size: 'medium',
  image: '',
};

Avatar.propDescriptions = {
  size: `One of: ["${sizes.join('", "')}"]`,
};

export default Avatar;
