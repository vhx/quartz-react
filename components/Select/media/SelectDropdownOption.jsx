import React from 'react';
import PropTypes from 'prop-types';

const MediaSelectDropdownOption = ({ description, label, onOptionToggle, uniqueId }) => (
  <div>
    Label: {label}
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
  onOptionToggle: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

MediaSelectDropdownOption.defaultProps = {
  description: '',
};

export default MediaSelectDropdownOption;
