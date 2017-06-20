import React, { Component } from 'react';
import { Select } from '../../index.js';

export default class SelectMinimal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      selectedOptions: {},
      selectedLabel: '',
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel /*, itemToggled, itemWillBeChecked */) {
    this.setState({ selectedOptions, selectedLabel });
  }

  render() {
    return (
      <Select
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
