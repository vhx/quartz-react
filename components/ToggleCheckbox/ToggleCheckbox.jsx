/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { excludeProps } from '../util';

import styles from './ToggleCheckbox.scss';

const checkboxClasses = props => {
  return classNames({
    [styles.toggleCheckboxLabel]: props.checked === false,
    [styles.toggleCheckedCheckboxLabel]: props.checked === true,
  })
}

const circleChecked = props => {
  return classNames({
    [styles.checkboxCircle]: props.checked === false,
    [styles.checkboxCircleChecked]: props.checked === true,
  })
}

const checkboxUpperCircle = props => {
  return classNames({
    [styles.circleTop]: props.checked === false,
    [styles.circleTopChecked]: props.checked === true,
  })
}

const checkboxLowerCircle = props => {
  return classNames({
    [styles.circleBottom]: props.checked === false,
    [styles.circleBottomChecked]: props.checked === true,
  })
}

const checkboxIcon = props => {
  return classNames({
    [styles.toggleUnchecked]: props.checked === false,
    [styles.toggleChecked]: props.checked === true,
  })
}
// NOTE: .form does not affect styles in any way, but is required for proper checkbox
// styling since quartz/components.css nests .checkbox under .form. This limitation can
// probably very easily be removed by changing https://github.com/vhx/quartz/blob/master/quartz-js/components/checkbox/styles/checkbox.scss
// to have .checkbox not be required to be a descendent of .form
const Checkbox = props => {
  return (
    <div className={styles.toggleCheckboxContainer}>
      <fieldset >
        <div className={styles.toggleCheckbox}>
          <input {...excludeProps([ 'label', 'uniqueId', 'size', 'type' ], props)} type='checkbox' name={props.uniqueId} id={props.uniqueId} />
        </div>
        <label className={checkboxClasses(props)}>
          <div className={checkboxIcon(props)} />
          <div className={styles.checkboxCircle}>
            <span className={checkboxUpperCircle(props)} />
            <span className={checkboxLowerCircle(props)} />
          </div>

        </label>
      </fieldset>
    </div>
  );
}



const sizes = [ 'small', 'medium', 'large' ];
const types = [ 'standard', 'toggle' ];

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(sizes),
  type: PropTypes.oneOf(types),
  uniqueId: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: false,
  label: '',
  onChange: null,
  size: 'medium',
  type: 'standard',
  value: '',
};

Checkbox.propDescriptions = {
  size: `One of: ["${sizes.join('", "')}"]`,
  type: `One of: ["${types.join('", "')}"]`,
  uniqueId: 'Must be globally unique—this sets the checkbox element\'s id attribute.',
};

export default Checkbox;
