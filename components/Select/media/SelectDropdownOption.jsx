import React from 'react';
import PropTypes from 'prop-types';

const MediaSelectDropdownOption = ({ description, label, onOptionToggle, value, uniqueId }) => (
  <div>
    Label: {label}
    Value: {value}
    Unique id: {uniqueId}
    Description: {description}
    <button onClick={() => onOptionToggle(uniqueId)}>
      Select
    </button>
  </div>
);

MediaSelectDropdownOption.propTypes = {
  description: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onOptionToggle: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

MediaSelectDropdownOption.defaultProps = {
  description: '',
};

export default MediaSelectDropdownOption;
