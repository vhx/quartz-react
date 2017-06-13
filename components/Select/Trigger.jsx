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

const Trigger = ({ color }) => (
  <a className={getTriggerClass({ color })}>
    asd
  </a>
);

Trigger.propTypes = {
  color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]).isRequired,
};

export default Trigger;
