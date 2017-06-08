import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RadioIcon from './RadioIcon.jsx';

const If = ({ condition, children }) => (condition ? <div>{children}</div> : <div />);

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

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

const RadioButton = ({ checked, description, index, label, onChange }) => (
  <li>
    <input
      type='radio'
      checked={checked}
      onChange={() => onChange(index)}
    />
    <label className={getClassName(checked)} onClick={() => onChange(index)}>
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
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  description: '',
};

export default RadioButton;
