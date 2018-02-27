/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { excludeProps } from '../util';

import styles from './Input.scss';

const searchIcon = props => {
  return classNames({
    [styles.searchIcon]: props.search === true,
  })
}

const errorColor = props => {
  return (props.error === true) ? '#ff4d4d' : '#1a2e3b';
}

const errorBorder = props => {
  return (props.error === true) ? '1px solid #ff4d4d' : '1px solid #1a2e3b';
}

const inputSize = props => {
  return (props.small === true) ? '45px' : '100%';
}

// NOTE: like in the Checkbox component, the `form` class does not
// do anything here except allow the css selector `.form input` to apply styles.
// We should consider refactoring the css to remove this requirement.
const Input = props => {
  const inputStyles = {
    color: errorColor(props),
    border: errorBorder(props),
    width: inputSize(props),
  }
  return (
    <div className={styles.form}>
      <input
        {...excludeProps([ 'className', 'error', 'search', 'small' ], props)}
        style={inputStyles}
        className={searchIcon(props)}
      />
    </div>
  );
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  search: PropTypes.bool,
  small: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  autoFocus: false,
  className: '',
  disabled: false,
  error: false,
  id: '',
  name: '',
  onBlur: null,
  onChange: null,
  onFocus: null,
  onKeyDown: null,
  onKeyUp: null,
  onKeyPress: null,
  onInput: null,
  placeholder: '',
  search: false,
  small: false,
  style: {},
  type: 'text',
};

export default Input;
