/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import iconList from './icon-list.js';

import styles from './Icon.scss'

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

  if (props.color === 'white' ) {
    Arr.push('White');
  }

  if (props.color === 'Porcelain' ) {
    Arr.push('Porcelain');
  }

  if (props.color === 'RegentGray' ) {
    Arr.push('RegentGray');
  }

  if (props.color === 'SoutherlySky' ) {
    Arr.push('SoutherlySky');
  }

  if (props.color === 'AstroGranite' ) {
    Arr.push('AstroGranite');
  }

  if (props.color === 'SunsetOrange' ) {
    Arr.push('SunsetOrange');
  }

  if (props.color === 'VimeoBlue' ) {
    Arr.push('VimeoBlue');
  }

  if (props.color === 'Foam' ) {
    Arr.push('Foam');
  }

  if (props.color === 'RumSwizzle' ) {
    Arr.push('RumSwizzle');
  }

  if (props.color === 'PalePink' ) {
    Arr.push('PalePink');
  }

  if (props.color === 'Pistachio' ) {
    Arr.push('Pistachio');
  }

  return Arr.join('');
}



const Icon = props => {
  return (
    <span
      className={`styles.${getClassName(props)}`}
    >
      <img
        className='tbd'
        src={props.src}
      />
    </span>
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
