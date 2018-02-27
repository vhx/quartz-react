import React from 'react';
import PropTypes from 'prop-types';

const componentColor = props => {
  console.log(props.color);
  if (props.color === 'white') {
    return '#ffffff';
  }

  if (props.color === 'VimeoBlue-Darkened') {
    return '#0088cc';
  }

  if (props.color === 'VimeoBlue') {
    return '#00adef';
  }

  if (props.color === 'Foam') {
    return '#e5f7fd';
  }

  if (props.color === 'Pistachio-Darkened') {
    return '#5a9e02';
  }

  if (props.color === 'Pistachio') {
    return '#7fc400';
  }

  if (props.color === 'RumSwizzle') {
    return '#f2f9e5';
  }

  if (props.color === 'SunsetOrange-Darkened') {
    return '#d96336';
  }

  if (props.color === 'SunsetOrange') {
    return '#ff4d4d';
  }

  if (props.color === 'PalePink') {
    return '#ffeded';
  }

  if (props.color === 'Porcelain') {
    return '#e3e8e9';
  }

  if (props.color === 'Plaster') {
    return '#eef1f2';
  }

  if (props.color === 'Paste') {
    return '#f6f7f8';
  }

  if (props.color === 'RegentGray') {
    return '#8699a6';
  }

  if (props.color === 'SoutherlySky') {
    return '#b3bfc8';
  }

  if (props.color === 'AstroGranite') {
    return '#1a2e3b';
  }

  return null;
}

componentColor.propTypes = {
  color: PropTypes.string,
}

componentColor.defaultProps = {
  color: '',
}

export default componentColor;
