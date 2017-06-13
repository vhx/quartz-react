import React from 'react';
import PropTypes from 'prop-types';

const SelectDropdownOption = ({ value, label, description }) => (
  <div>
    Value: {value}
    Label: {label}
    Description: {description}
  </div>
);

SelectDropdownOption.propTypes = {
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
};

SelectDropdownOption.defaultProps = {
  description: '',
};

export default SelectDropdownOption;
