/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Trigger from './Trigger.jsx';
import SelectDropdown from './SelectDropdown.jsx';

function getClass(props) {
  const { caretAlign, dropdownPosition, inline } = props;
  return classNames({
    inline,
    form: true,
    relative: true,
    'c-select--container': true,
    // 'has-search': props.hasSearch,
    // 'has-trigger': props.hasTrigger,
    // 'has-media': props.hasMedia,
    'caret--top-right':     dropdownPosition === 'below' && caretAlign === 'right',
    'caret--top-left':      dropdownPosition === 'below' && caretAlign === 'left',
    'caret--top-center':    dropdownPosition === 'below' && caretAlign === 'center',
    'caret--bottom-right':  dropdownPosition === 'above' && caretAlign === 'right',
    'caret--bottom-left':   dropdownPosition === 'above' && caretAlign === 'left',
    'caret--bottom-center': dropdownPosition === 'above' && caretAlign === 'center',
  });
}

const Select = props => (
  <div className={getClass(props)}>
    <props.Trigger {...props} />
    <SelectDropdown {...props} />
  </div>
);

Select.propTypes = {
  caretAlign: PropTypes.oneOf([ 'left', 'center', 'right' ]),
  color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]),
  dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]),
  isOpen: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  // hasSearch: PropTypes.bool,
  // hasTrigger: PropTypes.bool,
  // hasMedia: PropTypes.bool,
  inline: PropTypes.bool,
  placeholder: PropTypes.string,
  Trigger: PropTypes.func, // allow developers to pass in a custom <Trigger> element
  triggerLabel: PropTypes.string,
};

Select.defaultProps = {
  caretAlign: 'right',
  color: 'gray',
  dropdownPosition: 'below',
  isOpen: false,
  options: [],
  // hasSearch: false,
  // hasTrigger: false,
  // hasMedia: false,
  inline: false,
  Trigger,
  triggerLabel: 'Select an option', // TODO: verify that this is a sensible default label
  placeholder: '', // TODO: does this override triggerLabel if empty? is it initial value?
};

export default Select;
