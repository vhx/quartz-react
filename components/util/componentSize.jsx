import React from 'react';
import PropTypes from 'prop-types';

const componentSize = props => {
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

componentSize.propTypes = {
  size: PropTypes.string,
}

componentSize.defaultProps = {
  size: '25px',
}

export default componentColor;
