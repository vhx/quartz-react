import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select.jsx';

export default class SelectMinimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
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


SelectMinimal.propTypes = {
  isOpen: PropTypes.bool,
};

SelectMinimal.defaultProps = {
  isOpen: false,
};

