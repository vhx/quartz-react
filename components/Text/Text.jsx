/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function getClassName(props) {
  return classNames({
    block: Boolean(props.block),
    'head-1': Boolean(props.h1),
    'head-2': Boolean(props.h2),
    'head-3': Boolean(props.h3),
    'head-4': Boolean(props.h4),
    'head-5': Boolean(props.h5),
    'text--navy': props.color === 'navy',
    'text--gray': props.color === 'gray',
    'text--teal': props.color === 'teal',
    'text--white': props.color === 'white',
  });
}

const Text = props => (
  <span className={getClassName(props)}>{props.children}</span>
);

Text.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  color: PropTypes.oneOf([ 'navy', 'gray', 'teal', 'white' ]),
};

Text.defaultProps = {
  block: false,
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  color: 'navy',
};

export default Text;
