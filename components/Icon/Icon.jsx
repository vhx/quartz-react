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

  return '25px';
}

const iconColor = props => {
  if (props.color === 'white') {
    return '#ffffff';
  }

  if (props.color === 'VimeoBlue') {
    return '#00adef';
  }

  if (props.color === 'SunsetOrange') {
    return '#ff4d4d';
  }

  if (props.color === 'Pistachio') {
    return '#7fc400';
  }

  if (props.color === 'Foam') {
    return '#e5f7fd';
  }

  if (props.color === 'RumSwizzle') {
    return '#f2f9e5';
  }

  if (props.color === 'PalePink') {
    return '#ffeded';
  }

  if (props.color === 'Paste') {
    return '#f6f7f8';
  }

  if (props.color === 'Plaster') {
    return '#eef1f2';
  }

  if (props.color === 'Porcelain') {
    return '#e3e8e9';
  }

  if (props.color === 'SoutherlySky') {
    return '#b3bfc8';
  }

  if (props.color === 'RegentGray') {
    return '#8699a6';
  }

  if (props.color === 'AstroGranite') {
    return '#1a2e3b';
  }

  return null;
}

const Icon = props => {
  const iconStyles = {
    backgroundColor: iconColor(props),
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

const colors = [ '', 'VimeoBlue', 'SunsetOrange', 'white', 'Pistachio', 'RumSwizzle', 'PalePink', 'Foam', 'Porcelain', 'Paste', 'Plaster', 'SoutherlySky', 'RegentGray', 'AstroGranite' ];
const sizes = [ 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ];

Icon.propTypes = {
  color: PropTypes.oneOf(colors),
  size: PropTypes.oneOf(sizes),
  src: PropTypes.string,
};

Icon.defaultProps = {
  color: null,
  size: 'small',
  src: '',
};

Icon.propDescriptions = {
  color: `One of: ["${colors.join('", "')}"]`,
  src: 'String: an image hosted locally in your repository',
  size: `One of: ["${sizes.join('", "')}"]`,
};

export default Icon;
