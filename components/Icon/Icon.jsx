/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import iconList from './icon-list.js';

import styles from './Icon.scss'

const iconSize = props => {

  if (props.size == 'xxsmall') {
    return '15px';
  }

  if (props.size == 'xsmall') {
    return '15px';
  }

  if (props.size == 'small') {
    return '25px';
  }

  if (props.size == 'medium') {
    return '35px';
  }

  if (props.size == 'large') {
    return '45px';
  }

  if (props.size == 'xlarge') {
    return '55px';
  }

  if (props.size == 'xxlarge') {
    return '65px';
  }
}

const Icon = props => {
  const iconStyles = {
    backgroundColor: props.color,
    width: iconSize(props),
    height: iconSize(props),
    backgroundImage: `url(${props.src})`,
  }
  return (
    <div
      className={styles.icon}
      style={iconStyles}
    />
  );
}

const colors = [ '', 'VimeoBlue', 'SunsetOrange', 'white', 'Pistachio', 'RumSwizzle', 'PalePink', 'Foam', 'Porcelain', 'SoutherlySky', 'RegentGray', 'AstroGranite' ];
const sizes = [ 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ];

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(colors),
  name: PropTypes.oneOf(iconList),
  size: PropTypes.oneOf(sizes),
  src: PropTypes.string,
};

Icon.defaultProps = {
  children: '',
  className: '',
  circle: false,
  color: null,
  size: 'xsmall',
  src: '',
  name: '',
};

Icon.propDescriptions = {
  color: `One of: ["${colors.join('", "')}"]`,
  name: 'String: One of any of the valid icon names',
  size: `One of: ["${sizes.join('", "')}"]`,
};

export default Icon;
