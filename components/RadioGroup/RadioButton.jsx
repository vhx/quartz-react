import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RadioIcon from './RadioIcon.jsx';
import { If } from '../util';

import styles from './RadioGroup.scss';

function getDescriptionClassName(checked) {
  return classNames({
    [styles.checkedButtonText]: checked,
    [styles.strongText]: true,
  });
}

function getClassName(checked) {
  return classNames({
    [styles.radioButtonLabel]: checked,
    [styles.radioButtonLabelGray]: !checked,
  });
}

function getTitleClassName(checked) {
  return classNames({
    [styles.checkedButtonTitle]: checked,
    [styles.uncheckedButtonTitle]: !checked,
    'text-2': true,
  });
}

function getStyle(description) {
  return { marginTop: description ? '0px' : '8px' };
}

const RadioButton = ({ checked, description, index, label, onCheck }) => (
  <li>
    <div className={styles.radioButtonWrapper}>
      <input
        type='radio'
        checked={checked}
        onChange={event => onCheck(event, index)}
      />
      <label
        className={getClassName(checked)}
        onClick={event => onCheck(event, index)}
      >
        <span className={styles.radioButtonRadioWrapper}>
          <RadioIcon />
        </span>
        <span className={styles.radioButtonsTextWrapper} style={getStyle(description)}>
          <strong className={getTitleClassName(checked)}>{label}</strong>
          <If condition={Boolean(description)}>
            <p className={getDescriptionClassName(checked)}>{description}</p>
          </If>
        </span>
      </label>
    </div>
  </li>
);

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  description: '',
};

export default RadioButton;
