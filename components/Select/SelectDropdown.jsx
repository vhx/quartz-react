import React from 'react';
import PropTypes from 'prop-types';
import { If } from '../util';
import SelectDropdownOption from './SelectDropdownOption.jsx';

const VERTICAL_OFFSET = 10;

function manuallyPositionAbove(dropdownPosition) {
  return (div) => {
    if (dropdownPosition === 'above') {
      div.style.top = `-${div.offsetHeight + VERTICAL_OFFSET}px`; // eslint-disable-line no-param-reassign
    }
  };
}

const SelectDropdown = ({ isOpen, options, dropdownPosition }) => (
  <div className={`c-select--dropdown bg-white border radius fill-width ${isOpen ? 'is-open' : ''}`} ref={manuallyPositionAbove(dropdownPosition)}>
   [  SEARCH GOES HERE  ]
    <ul className='c-select--options margin-left-reset loader-slate loader--transparent'>
      <If condition={options.length === 0}>
        <li className='padding-horz-large padding-top-small padding-bottom-medium text--gray text-center' />
      </If>
      <div>
        { /* we could use `value` instead of `uniqueId` as key if value is unique among the list (which I think it would be) */ }
        { options.map(item => <SelectDropdownOption key={item.uniqueId} {...item} />) }
      </div>
    </ul>
  </div>
);

SelectDropdown.propTypes = {
  dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
  })).isRequired,
};

export default SelectDropdown;
