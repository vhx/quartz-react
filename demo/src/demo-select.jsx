import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MediaSelect, Select } from '../../index.js';

function removeFromArray(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) { array.splice(index, 1); }
  return array;
}

class StatefulSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isOpen: false,
      selectedOptions: {}, // if you do not want to initialize with all undefined options, but instead set every unchecked option to false, set selectedOptions to this: props.options.reduce((obj, option) => { obj[option.uniqueId] = false; return obj; }, {})
      selectedLabel: '',
      filteredOptions: props.options,
      searchValue: '',
      processingOptions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.fakeSearch = this.fakeSearch.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel, item, itemWillBeChecked) {
    console.log({ selectedOptions, selectedLabel, item, itemWillBeChecked });

    // pretendToProcessOptions is just a prop for the demo so that
    // this component can know to simulate `processing` state.
    // in real usage, that prop would not exist.
    if (this.props.pretendToProcessOptions) {
      const { processingOptions } = this.state;
      this.setState({ processingOptions: processingOptions.concat(item.uniqueId) });
      setTimeout(() => {
        this.setState({
          selectedOptions,
          selectedLabel,
          processingOptions: removeFromArray(processingOptions, item.uniqueId),
        });
      }, 500);
    } else {
      this.setState({ selectedOptions, selectedLabel });
    }
  }

  fakeSearch(query) {
    // NOTE: this means debouncing is up to the user of the component!
    this.setState({ searchValue: query, isLoading: true });
    setTimeout(() => {
      const filteredOptions = this.props.options.filter(opt => opt.label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      this.setState({ filteredOptions, isLoading: false });
    }, 500);
  }

  render() {
    const SelectComponent = this.props.type === 'media' ? MediaSelect : Select;
    return (
      <SelectComponent
        isLoading={this.state.isLoading}
        {...this.props}
        isOpen={this.state.isOpen}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={this.setOpen}
        processingOptions={this.state.processingOptions}
        triggerLabel={this.state.selectedLabel}
        searchValue={this.state.searchValue}
        options={this.state.filteredOptions}
        search={this.props.search ? this.fakeSearch : null}
      />
    );
  }
}

StatefulSelect.propTypes = {
  pretendToProcessOptions: PropTypes.bool, // this is just for the demo
  options: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
  })).isRequired,
  search: PropTypes.func,
  type: PropTypes.oneOf([ '', 'media' ]),
};

StatefulSelect.defaultProps = {
  pretendToProcessOptions: false,
  search: null,
  type: '',
};

export default StatefulSelect;
