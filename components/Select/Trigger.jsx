import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function getTriggerClass({ color }) {
  return classNames({
    truncate: true,
    'btn--fill': true,
    'btn-dropdown-gray':  color === 'gray',
    'btn-dropdown-white': color === 'white',
    'btn-dropdown-teal':  color === 'teal',
    'c-select--trigger': true,
  });
}

const Trigger = ({ color, isOpen, onOpenToggle, triggerLabel, triggerPlaceholder }) => (
  <span className={getTriggerClass({ color })} onClick={() => onOpenToggle(!isOpen)}>{triggerLabel || triggerPlaceholder}</span>
);

Trigger.propTypes = {
  color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenToggle: PropTypes.func.isRequired,
  triggerLabel: PropTypes.string.isRequired,
  triggerPlaceholder: PropTypes.string.isRequired,
};

export default Trigger;
