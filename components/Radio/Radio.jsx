import React from 'react';
import PropTypes from 'prop-types';

const RadioIcon = () => (
  <span className='radio--icon'>
    <i className='circle-top'><span /></i>
    <i className='circle-bottom'><span /></i>
  </span>
);

const Radio = ({ checked, index, label, onChange, uniqueId }) => (
  <li>
    <input
      type='radio'
      checked={checked}
      id={uniqueId}
      name={uniqueId}
      onChange={() => onChange(index)}
    />
    <label htmlFor={uniqueId}>
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
  uniqueId: PropTypes.string.isRequired,
};

export default Radio;
