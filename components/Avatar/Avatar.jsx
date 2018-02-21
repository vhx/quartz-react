/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.scss';
import cx from 'classnames';

const setClass = (props) => {
  return cx({
    [styles.defaultAvatarXsmall]: props.size === 'xsmall',
    [styles.defaultAvatarSmall]: props.size === 'small',
    [styles.defaultAvatarMedium]: props.size === 'medium',
    [styles.defaultAvatarLarge]: props.size === 'large',
    [styles.defaultAvatarXlarge]: props.size === 'xlarge',
    [styles.defaultAvatarXxlarge]: props.size === 'xxlarge',
  })
}


const Avatar = props => {
  console.log('avatar', props);
  return (
    <span className={setClass(props)} style={{ zIndex: 1 }}>
      <span
        className={styles.avatarImage}
        style={{
          backgroundImage: `url('${props.image}')`,
        }}
      />
    </span>
  );
};

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
