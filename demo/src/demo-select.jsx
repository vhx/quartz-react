import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from '../../index.js';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.fakeSearch = this.fakeSearch.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel, itemToggled) {
    console.log({ selectedOptions, selectedLabel, itemToggled });
    this.setState({ selectedOptions, selectedLabel });
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
    return (
      <Select
        isLoading={this.state.isLoading}
        {...this.props}
        isOpen={this.state.isOpen}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={this.setOpen}
        triggerLabel={this.state.selectedLabel}
        searchValue={this.state.searchValue}
        options={this.state.filteredOptions}
        search={this.props.search ? this.fakeSearch : null}
      />
    );
  }
}

StatefulSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
  })).isRequired,
  search: PropTypes.func,
};

StatefulSelect.defaultProps = {
  search: null,
};

export default StatefulSelect;
