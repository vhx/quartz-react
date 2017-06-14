import React from 'react';
import PropTypes from 'prop-types';

const SelectDropdownOption = ({ label, onOptionToggle, value, uniqueId }) => (
  <div>
    Label: {label}
    Value: {value}
    Unique id: {uniqueId}
    <button onClick={() => onOptionToggle(uniqueId)}>
      Select
    </button>
  </div>
);

SelectDropdownOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onOptionToggle: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

export default SelectDropdownOption;
