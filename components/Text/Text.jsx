/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Text.scss';

function getClassName(props) {
  console.log('getClassName', props);
  return classNames({
    [styles.headOne]: props.h1 === true,
    [styles.headTwo]: props.h2 === true,
    [styles.headThree]: props.h3 === true,
    [styles.headFour]: props.h4 === true,
    [styles.headFive]: props.h5 === true,
    [styles.headSix]: props.h6 === true,
  });
}

const Text = props => {
  console.log(props);
  return(
    <span className={getClassName(props)}>{props.children}</span>
  );
};

const colors = [ 'navy', 'gray', 'teal', 'white', 'vimeo-blue', 'sunset-orange', 'regent-gray', 'astro-granite' ];

Text.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf(colors),
};

Text.defaultProps = {
  block: false,
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  className: '',
  color: 'navy',
};

Text.propDescriptions = {
  block: 'Set to true to make block-level text. Otherwise defaults to inline.',
  color: `One of: ["${colors.join('", "')}"]`,
};

export default Text;
