/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import iconList from './icon-list.js';

import styles from './Icon.scss'

const jsUcfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function getClassName({ button, circle, className, left, color, name, right, size }) {
//   return classNames(className, {
//     icon: !button,
//     [`styles.icon${jsUcfirst(name)}`]: !color,
//     [`styles.icon${jsUcfirst(name)}${jsUcfirst(color)}`]: !!color,
//     [styles.iconCircle]: circle,
//     [styles.iconLeft]: left,
//     [styles.iconRight]: right,
//     [styles.iconXxsmall]: size === 'xxsmall',
//     [styles.iconXsmall]: size === 'xsmall',
//     [styles.iconSmall]: size === 'small',
//     [styles.iconMedium]: size === 'medium',
//     [styles.iconLaarge]: size === 'large',
//     [styles.iconXlarge]: size === 'xlarge',
//     [styles.iconXxlarge]: size === 'xxlarge',
//   });
// }


const getClassName = props => {

  let Arr = ['icon'];

  if (props.size == 'xxsmall') {
    Arr.push('Xxsmall');
  }

  if (props.size == 'xsmall') {
    Arr.push('Xsmall');
  }

  if (props.size == 'small') {
    Arr.push('Small');
  }

  if (props.size == 'medium') {
    Arr.push('Medium');
  }

  if (props.size == 'large') {
    Arr.push('Large');
  }

  if (props.size == 'xlarge') {
    Arr.push('Xlarge');
  }

  if (props.size == 'xxlarge') {
    Arr.push('Xxlarge');
  }


  if (props.right === true) {
    Arr.push('Right');
  }

  if (props.left === true) {
    Arr.push('Left');
  }

  if (props.circle === true) {
    Arr.push('Circle');
  }

  return Arr.join('');
}

const Icon = props => (
  <span className={getClassName(props)}>{props.children}</span>
);

const colors = [ '', 'navy', 'teal', 'white', 'gray' ];
const sizes = [ 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge' ];

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  circle: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  name: PropTypes.oneOf(iconList).isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
  size: PropTypes.oneOf(sizes),
};

Icon.defaultProps = {
  children: '',
  className: '',
  circle: false,
  color: null,
  left: false,
  right: false,
  size: 'xsmall',
};

Icon.propDescriptions = {
  color: `One of: ["${colors.join('", "')}"]`,
  name: 'String: One of any of the valid icon names',
  size: `One of: ["${sizes.join('", "')}"]`,
};

export default Icon;
