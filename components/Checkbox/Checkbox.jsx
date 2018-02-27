/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { excludeProps } from '../util';

import styles from './Checkbox.scss';

const checkboxClasses = props => {
  return classNames({
    [styles.standardCheckboxLabel]: props.checked === false,
    [styles.standardCheckedCheckboxLabel]: props.checked === true,
  })
}

const Checkbox = props => {
  return (
    <div className={styles.standardCheckboxWrapper}>
      <fieldset>
        <div className={styles.standardCheckbox}>
          <input {...excludeProps([ 'label', 'uniqueId', 'size', 'type' ], props)} type='checkbox' name={props.uniqueId} id={props.uniqueId} />
        </div>
        <label className={checkboxClasses(props)} htmlFor={props.uniqueId} />
      </fieldset>
    </div>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  uniqueId: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: false,
  label: '',
  onChange: null,
  value: '',
};

Checkbox.propDescriptions = {
  uniqueId: 'Must be globally unique—this sets the checkbox element\'s id attribute.',
};

export default Checkbox;
