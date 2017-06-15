import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
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

/*
Given selectedOptions like: { foo: true, bar: false, baz: false }
and given an optionsList like: [{ uniqueId: 'foo', label: 'Item 1'}, { uniqueId: 'bar', label: 'Item 2' }, { uniqueId: 'baz', label: 'Item 3'}]
=> 'Item 1' // returns the label of the selected option
*/
function generateLabel(selectedOptions, optionsList) {
  const selectedKeys = Object.keys(selectedOptions).filter(key => Boolean(selectedOptions[key]));
  if (selectedKeys.length === 0) { return ''; }
  if (selectedKeys.length === 1) {
    const selectedItemKey = selectedKeys[0];
    const selectedItem = optionsList.filter(option => option.uniqueId === selectedItemKey)[0];
    return selectedItem.label;
  }
  return 'Multiple items selected';
}

export default function SelectDropdownHOC({ Option }) {
  const SelectDropdown = ({ dropdownPosition, isLoading, multiSelect, onOpenToggle, onSelectionToggle, options, search, searchValue, selectedOptions }) => {
    // If the `multiSelect` prop is available, toggle by way of `util.multiSelect`. No need to hide the dropdown.
    // If it is not, toggle by way of `util.select` and hide the dropdown
    const chooseOption = multiSelect ? util.multiSelect : (_options, id) => {
      onOpenToggle(false); // this hides the dropdown
      return util.select(selectedOptions, id);
    };

    const generateOption = (item) => {
      const onToggle = (id) => {
        const newSelection = chooseOption(selectedOptions, id);
        const label = generateLabel(newSelection, options);
        const noItemsWereSelected = label === '';
        if (noItemsWereSelected && !multiSelect) {
          onOpenToggle(false);
          return;
        }
        onSelectionToggle(newSelection, label, item);
      };
      return <Option key={item.uniqueId} onOptionToggle={onToggle} isLoading={isLoading} isSelected={Boolean(selectedOptions[item.uniqueId])} {...item} />;
    };

    return (
      <div className='c-select--dropdown bg-white border radius fill-width is-open' ref={manualOffsetV(dropdownPosition === 'above', VERTICAL_OFFSET)}>
        <If condition={Boolean(search)}>
          <div className='c-select--input-container padding-medium absolute bg-white fill-width radius'>
            <Input placeholder='Search' onInput={event => search(event.target.value)} value={searchValue} autoFocus search />
          </div>
        </If>
        <ul className={`c-select--options margin-left-reset loader-slate loader--transparent ${isLoading ? 'is-loading' : ''}`}>
          <If condition={options.length === 0}>
            <li className='padding-horz-large padding-top-small padding-bottom-medium text--gray text-center' />
          </If>
          <div>
            { options.map(generateOption) }
          </div>
        </ul>
      </div>
    );
  };

  SelectDropdown.propTypes = {
    dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]).isRequired,
    isLoading: PropTypes.bool,
    multiSelect: PropTypes.bool.isRequired,
    multiselect: util.typoPropType({ correct: 'multiSelect' }), // eslint-disable-line react/require-default-props, react/no-unused-prop-types
    onOpenToggle: PropTypes.func.isRequired,
    onSelectionToggle: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      label: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
    })).isRequired,
    selectedOptions: PropTypes.objectOf(PropTypes.bool).isRequired,
    search: PropTypes.func,
    searchValue: PropTypes.string,
  };

  SelectDropdown.defaultProps = {
    isLoading: false,
    search: null,
    searchValue: '',
  };

  return SelectDropdown;
}
