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

Avatar.propTypes = {
  size: PropTypes.oneOf([ 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ]),
  image: PropTypes.string,
};

Avatar.defaultProps = {
  size: 'medium',
  image: '',
};

export default Avatar;
