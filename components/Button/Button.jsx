/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { excludeProps } from '../util';

import styles from "./Button.scss";

function getClassName({ className, color, size, typeface, processing }) {
  return classNames('btn', className, {
    // core colors
    [styles.grayButton]: color === 'gray',
    [styles.whiteButton]: color === 'white',
    [styles.redButton]: color === 'red',
    // vimeo-colors
    [styles.vimeoAlt]: color === 'vimeo-alt',
    [styles.vimeoBlue]: color === 'vimeo-blue',
    [styles.vimeoSecondary]: color === 'vimeo-secondary',
    [styles.vimeoSecondaryOutline]: color === 'vimeo-secondary-outline',
    // alternate colors
    [styles.transparentButton]: color === 'transparent',
    // brand colors
    [styles.twitterButton]: color === 'twitter',
    [styles.facebookButton]: color === 'facebook',
    [styles.tumblrButton]: color === 'tumblr',
    [styles.paypalButton]: color === 'paypal',
    [styles.rokuButton]: color === 'roku',
    // sizes
    [styles.smallButton]: size === 'small',
    [styles.mediumButton]: size === 'medium',
    [styles.largeButton]: size === 'large',
    [styles.halfButton]: size === 'half',
    [styles.fillButton]: size === 'fill',
    [styles.isProcessing]: processing === true,
  });
}

const Button = (props) => {
  const cl = getClassName(props);
  return (
    <button className={cl} {...excludeProps([ 'className', 'children', 'color', 'processing', 'size', 'typeface' ], props)}>{props.children}</button>
  );
};

const colors = [ 'gray', 'white', 'red', 'transparent', 'vimeo-blue', 'vimeo-secondary', 'vimeo-secondary-outline', 'vimeo-alt', 'twitter', 'facebook', 'tumblr', 'paypal', 'roku' ];
const sizes = [ 'small', 'medium', 'large', 'half', 'fill' ];

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(colors),
  processing: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(sizes),
};

Button.defaultProps = {
  className: '',
  color: 'gray',
  onClick: null,
  processing: false,
  size: 'medium',
};

Button.propDescriptions = {
  color: `One of: ["${colors.join('", "')}"]`,
  processing: 'Displays loading indicator',
  size: `One of: ["${sizes.join('", "')}"]`,
};

export default Button;
