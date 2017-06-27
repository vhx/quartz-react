/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { excludeProps } from '../util';

function getClassName({ className, color, size, typeface, processing }) {
  return classNames('btn', className, {
    // core colors
    'btn-gray': color === 'gray',
    'btn-teal': color === 'teal',
    'btn-white': color === 'white',
    'btn-red': color === 'red',
    // alternate colors
    'btn-purple': color === 'purple',
    'btn-green': color === 'green',
    'btn-slate': color === 'slate',
    'btn-black': color === 'black',
    'btn-yellow': color === 'yellow',
    'btn-transparent': color === 'transparent',
    // brand colors
    'btn-twitter': color === 'twitter',
    'btn-facebook': color === 'facebook',
    'btn-tumblr': color === 'tumblr',
    'btn-paypal': color === 'paypal',
    'btn-roku': color === 'roku',
    // sizes
    'btn--small': size === 'small',
    'btn--medium': size === 'medium',
    'btn--large': size === 'large',
    'btn--half': size === 'half',
    'btn--fill': size === 'fill',
    // typefaces
    'btn--brandon': typeface === 'brandon',
    // button states
    'is-processing': processing === true,
  });
}

const Button = (props) => {
  const cl = getClassName(props);
  return (
    <button className={cl} {...excludeProps([ 'className', 'children', 'color', 'processing', 'size', 'typeface' ], props)}>{props.children}</button>
  );
};


Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([ 'gray', 'teal', 'white', 'red', 'purple', 'green', 'slate', 'black', 'yellow', 'transparent', 'twitter', 'facebook', 'tumblr', 'paypal', 'roku' ]),
  processing: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([ 'small', 'medium', 'large', 'half', 'fill' ]),
  typeface: PropTypes.oneOf([ 'brandon', '' ]),
};

Button.defaultProps = {
  className: '',
  color: 'gray',
  onClick: null,
  processing: false,
  size: 'medium',
  typeface: '',
};

export default Button;
