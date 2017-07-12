/* IMPORTANT: This is only used in unit tests */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaSelect from './Select.jsx';

function removeFromArray(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) { array.splice(index, 1); }
  return array;
}

export default class StatefulMediaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isOpen: props.isOpen || false,
      selectedOptions: {}, // if you do not want to initialize with all undefined options, but instead set every unchecked option to false, set selectedOptions to this: props.options.reduce((obj, option) => { obj[option.uniqueId] = false; return obj; }, {})
      selectedLabel: '',
      filteredOptions: props.options,
      searchValue: '',
      processingOptions: [],
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel, item /* , itemWillBeChecked */) {
    const { processingOptions } = this.state;
    this.setState({ processingOptions: processingOptions.concat(item.uniqueId) });
    setTimeout(() => {
      this.setState({
        selectedOptions,
        selectedLabel,
        processingOptions: removeFromArray(processingOptions, item.uniqueId),
      });
    }, 10);
  }

  // NOTE: debouncing is up to the user of the component!
  search(query) {
    const filteredOptions = this.props.options.filter(opt => opt.label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    this.setState({ filteredOptions, isLoading: false, searchValue: query });
  }

  render() {
    return (
      <MediaSelect
        {...this.props}
        isOpen={this.state.isOpen}
        isLoading={this.state.isLoading}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={this.setOpen}
        triggerLabel={this.state.selectedLabel}
        search={this.search}
        searchValue={this.state.searchValue}
        options={this.state.filteredOptions}
        processingOptions={this.state.processingOptions}
      />
    );
  }
}

StatefulMediaSelect.propTypes = {
  options: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
};

StatefulMediaSelect.defaultProps = {
  isOpen: false,
};
