import React from 'react';
import PropTypes from 'prop-types';
import RadioIcon from './RadioIcon.jsx';

const Radio = ({ checked, index, label, onChange }) => (
  <li>
    <input
      type='radio'
      checked={checked}
      onChange={() => onChange(index)}
    />
    <label onClick={() => onChange(index)}>
      <RadioIcon />
      <span className='radio--label text-left'>{label}</span>
    </label>
  </li>
);

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Radio;
