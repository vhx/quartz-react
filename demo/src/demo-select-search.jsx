import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from '../../index.js';

export default class SelectSearchable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOptions: props.options,
      isOpen: false,
      isLoading: false,
      selectedOptions: {},
      selectedLabel: '',
      searchValue: '',
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel /* , itemToggled, itemWillBeChecked */) {
    this.setState({ selectedOptions, selectedLabel });
  }

  search(query) {
    // NOTE: this means debouncing is up to the user of the component!
    this.setState({ searchValue: query, isLoading: true });
    setTimeout(() => {
      const filteredOptions = this.props.options.filter(opt => opt.label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      this.setState({ filteredOptions, isLoading: false });
    }, 500);
  }

  render() {
    return (
      <Select
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
      />
    );
  }
}


SelectSearchable.propTypes = {
  options: PropTypes.array.isRequired,
};
