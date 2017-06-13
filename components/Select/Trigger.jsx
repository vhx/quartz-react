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

const Trigger = ({ color, triggerLabel }) => (
  <a className={getTriggerClass({ color })}>{triggerLabel}</a>
);

Trigger.propTypes = {
  color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]).isRequired,
  isOpen: PropTypes.bool.isRequired, // TODO: could remove this propType, but it would probably be useful to anyone specifying a custom <Trigger> element
  triggerLabel: PropTypes.string.isRequired,
};

export default Trigger;
