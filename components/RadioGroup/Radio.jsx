import React from 'react';
import PropTypes from 'prop-types';
import RadioIcon from './RadioIcon.jsx';

const Radio = ({ checked, index, label, onCheck }) => (
  <li>
    <input
      type='radio'
      checked={checked}
      onChange={event => onCheck(event, index)}
    />
    <label
      htmlFor={label}
      onClick={event => onCheck(event, index)}>
        <RadioIcon id={label} />
        <span className='radio--label text-left'>{label}</span>
    </label>
  </li>
);

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default Radio;
