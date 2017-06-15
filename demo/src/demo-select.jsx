import React, { Component } from 'react';
import { Select } from '../../index.js';

class StatefulSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOptions: {}, // if you do not want to initialize with all undefined options, but instead set every unchecked option to false, set selectedOptions to this: props.options.reduce((obj, option) => { obj[option.uniqueId] = false; return obj; }, {})
      selectedLabel: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel, itemToggled) {
    console.log({ selectedOptions, selectedLabel, itemToggled });
    this.setState({ selectedOptions, selectedLabel });
  }

  render() {
    return (
      <Select
        isOpen={this.state.isOpen}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={this.setOpen}
        triggerLabel={this.state.selectedLabel}
        {...this.props}
      />
    );
  }
}

export default StatefulSelect;
