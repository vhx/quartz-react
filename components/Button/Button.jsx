import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './button.css';

function getClassName({ className, color, size, typeface }) {
  return classNames(css.btn, className, {
    // core colors
    [css['btn-gray']]: color === 'gray',
    [css['btn-teal']]: color === 'teal',
    [css['btn-white']]: color === 'white',
    [css['btn-red']]: color === 'red',
    // alternate colors
    [css['btn-purple']]: color === 'purple',
    [css['btn-green']]: color === 'green',
    [css['btn-slate']]: color === 'slate',
    [css['btn-black']]: color === 'black',
    [css['btn-yellow']]: color === 'yellow',
    [css['btn-transparent']]: color === 'transparent',
    [css['btn-twitter']]: color === 'twitter',
    [css['btn-facebook']]: color === 'facebook',
    [css['btn-tumblr']]: color === 'tumblr',
    [css['btn-paypal']]: color === 'paypal',
    [css['btn-roku']]: color === 'roku',
    // sizes
    [css['btn--small']]: size === 'small',
    [css['btn--medium']]: size === 'medium',
    [css['btn--large']]: size === 'large',
    [css['btn--half']]: size === 'half',
    [css['btn--fill']]: size === 'fill',
    // TODO: processing state, btn-dropdowns, (own component), btn-groups (own component), btn with icon
    [css['btn--brandon']]: typeface === 'brandon',
  });
}

const Button = ({ children, onClick, className, color, size, typeface }) => {
  const cl = getClassName({ className, color, size, typeface });
  return (
    <button className={cl} onClick={onClick}>{children}</button>
  );
};


Button.propTypes = {
  // attrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([ 'gray', 'teal', 'white', 'red', 'purple', 'green', 'slate', 'black', 'yellow', 'transparent', 'twitter', 'facebook', 'tumblr', 'paypal', 'roku' ]),
  onClick: PropTypes.func,
  size: PropTypes.oneOf([ 'small', 'medium', 'large', 'half', 'fill' ]),
  typeface: PropTypes.oneOf([ 'brandon', '' ]),
};

Button.defaultProps = {
  // attrs: {},
  className: '',
  color: 'gray',
  onClick: null,
  size: 'small',
  typeface: '',
};

export default Button;
