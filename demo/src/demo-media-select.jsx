import React, { Component } from 'react';
import { MediaSelect } from '../../index.js';

export default class MediaSelectMinimal extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isOpen: false,
      selectedOptions: {}, // if you do not want to initialize with all undefined options, but instead set every unchecked option to false, set selectedOptions to this: props.options.reduce((obj, option) => { obj[option.uniqueId] = false; return obj; }, {})
      selectedLabel: '',
      searchValue: '',
      processingOptions: [],
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel /* , item, itemWillBeChecked */) {
    this.setState({ selectedOptions, selectedLabel });
  }

  render() {
    return (
      <MediaSelect
        {...this.props}
        isOpen={this.state.isOpen}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={this.setOpen}
        triggerLabel={this.state.selectedLabel}
      />
    );
  }
}
