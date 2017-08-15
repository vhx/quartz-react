/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import iconList from './icon-list.js';

function getClassName({ button, circle, className, left, color, name, right, size }) {
  return classNames(className, {
    icon: !button,
    [`icon-${name}`]: !color,
    [`icon-${name}-${color}`]: !!color,
    'icon-circle': circle,
    'icon--left': left,
    'icon--right': right,
    'icon--xxsmall': size === 'xxsmall',
    'icon--xsmall': size === 'xsmall',
    'icon--small': size === 'small',
    'icon--medium': size === 'medium',
    'icon--large': size === 'large',
    'icon--xlarge': size === 'xlarge',
    'icon--xxlarge': size === 'xxlarge',
  });
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
