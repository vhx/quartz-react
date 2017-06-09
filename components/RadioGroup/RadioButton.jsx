import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RadioIcon from './RadioIcon.jsx';
import If from '../util/If.jsx';

function getDescriptionClassName(checked) {
  return classNames({
    'text--white': checked,
    'text-4': true,
  });
}

function getClassName(checked) {
  return classNames({
    'btn-teal': checked,
    'btn-gray': !checked,
    'btn--fill': true,
    'btn-radio': true,
    'margin-bottom-medium': true,
  });
}

function getTitleClassName(checked) {
  return classNames({
    'text--white': checked,
    'text--navy': !checked,
    'text-2': true,
  });
}

function getStyle(description) {
  return { marginTop: description ? '0px' : '8px' };
}

const RadioButton = ({ checked, description, index, label, onCheck }) => (
  <li>
    <input
      type='radio'
      checked={checked}
      onChange={event => onCheck(event, index)}
    />
    <label className={getClassName(checked)} onClick={event => onCheck(event, index)}>
      <RadioIcon />
      <span className='radio--label text-left padding-left-small' style={getStyle(description)}>
        <strong className={getTitleClassName(checked)}>{label}</strong>
        <If condition={Boolean(description)}>
          <p className={getDescriptionClassName(checked)}>{description}</p>
        </If>
      </span>
    </label>
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
