import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Trigger from './Trigger.jsx';

const SelectDropdown = ({ isOpen }) => (
  <div className={`c-select--dropdown bg-white border radius fill-width ${isOpen ? 'is-open' : ''}`}>
    <ul className='c-select--options margin-left-reset loader-slate loader--transparent'>
      <li className='padding-horz-large padding-top-small padding-bottom-medium text--gray text-center'> foo</li>
    </ul>
  </div>
);

SelectDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

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
    'caret--top-right':     dropdownPosition === 'above' && caretAlign === 'right',
    'caret--top-left':      dropdownPosition === 'above' && caretAlign === 'left',
    'caret--top-center':    dropdownPosition === 'above' && caretAlign === 'center',
    'caret--bottom-right':  dropdownPosition === 'below' && caretAlign === 'right',
    'caret--bottom-left':   dropdownPosition === 'below' && caretAlign === 'left',
    'caret--bottom-center': dropdownPosition === 'below' && caretAlign === 'center',
  });
}

const Select = props => (
  <div className={getClass(props)}>
    <props.Trigger color={props.color} />
    <SelectDropdown {...props} />
  </div>
);

Select.propTypes = {
  caretAlign: PropTypes.oneOf([ 'left', 'center', 'right' ]),
  color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]),
  dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]),
  isOpen: PropTypes.bool,
  // hasSearch: PropTypes.bool,
  // hasTrigger: PropTypes.bool,
  // hasMedia: PropTypes.bool,
  inline: PropTypes.bool,
  Trigger: PropTypes.element,
};

Select.defaultProps = {
  caretAlign: 'right',
  color: 'gray',
  dropdownPosition: 'below',
  isOpen: true,
  // hasSearch: false,
  // hasTrigger: false,
  // hasMedia: false,
  inline: false,
  Trigger: Trigger,
};

export default Select;
