import React from 'react';
import PropTypes from 'prop-types';
import * as util from '../util';

const If = util.If;

const VERTICAL_OFFSET = 10;


function manualOffsetV(shouldReposition, offset) {
  return (el) => {
    if (el && shouldReposition) {
      el.style.top = `-${el.offsetHeight + offset}px`; // eslint-disable-line no-param-reassign
    }
  };
}


export default function SelectDropdownHOC({ Option }) {
  const SelectDropdown = ({ dropdownPosition, isOpen, multiSelect, onOpenToggle, onSelectionToggle, options, search, selectedOptions }) => {
    // If the `multiSelect` prop is available, toggle by way of `util.multiSelect`. No need to hide the dropdown.
    // If it is not, toggle by way of `util.select` and hide the dropdown
    const chooseOption = multiSelect ? util.multiSelect : (_options, id) => {
      onOpenToggle(false); // this hides the dropdown
      return util.select(selectedOptions, id);
    };

    return (
      <div className={`c-select--dropdown bg-white border radius fill-width ${isOpen ? 'is-open' : ''}`} ref={manualOffsetV(dropdownPosition === 'above', VERTICAL_OFFSET)}>
        <If condition={Boolean(search)}>[  SEARCH GOES HERE  ]</If>
        <ul className='c-select--options margin-left-reset loader-slate loader--transparent'>
          <If condition={options.length === 0}>
            <li className='padding-horz-large padding-top-small padding-bottom-medium text--gray text-center' />
          </If>
          <div>
            { /* we could use `value` instead of `uniqueId` as key if value is unique among the list (which I think it would be) */ }
            { options.map(item => <Option key={item.uniqueId} onOptionToggle={id => onSelectionToggle(chooseOption(selectedOptions, id), id)} {...item} />) }
          </div>
        </ul>
      </div>
    );
  };

  SelectDropdown.propTypes = {
    dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]).isRequired,
    isOpen: PropTypes.bool.isRequired,
    multiSelect: PropTypes.bool.isRequired,
    multiselect: util.typoPropType({ correct: 'multiSelect' }), // eslint-disable-line react/require-default-props, react/no-unused-prop-types
    onOpenToggle: PropTypes.func.isRequired,
    onSelectionToggle: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      label: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
    selectedOptions: PropTypes.objectOf(PropTypes.bool).isRequired,
    search: PropTypes.func,
  };

  SelectDropdown.defaultProps = {
    search: null,
  };

  return SelectDropdown;
}
