/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import iconList from './icon-list.js';
import { componentColor, componentSize } from '../util';

import styles from './Icon.scss'

const Icon = props => {
  const iconStyles = {
    backgroundColor: componentColor(props),
    width: componentSize(props),
    height: componentSize(props),
    backgroundImage: `url(${props.src})`,
    backgroundRepeat: 'no-repeat',
  }
  return (
    <div
      className={styles.icon}
      style={iconStyles}
    />
  );
}

const colors = [ '', 'VimeoBlue', 'SunsetOrange', 'white',  'Porcelain', 'AstroGranite' ];
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
