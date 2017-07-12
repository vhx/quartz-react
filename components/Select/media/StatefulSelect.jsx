import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaSelect from './Select.jsx';

export default class StatefulMediaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
      selectedOptions: {},
      label: '',
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
    this.props.onOpenToggle(isOpen);
  }

  handleChange(selectedOptions, label, itemToggled, itemWillBeChecked) {
    this.setState({ selectedOptions, label });
    this.props.onSelectionToggle(selectedOptions, label, itemToggled, itemWillBeChecked);
  }

  render() {
    return (
      <MediaSelect
        {...this.props}
        isOpen={this.state.isOpen}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={this.setOpen}
        triggerLabel={this.state.label}
      />
    );
  }
}


StatefulMediaSelect.propTypes = {
  isOpen: PropTypes.bool,
  onOpenToggle: PropTypes.func,
  onSelectionToggle: PropTypes.func,
};

StatefulMediaSelect.defaultProps = {
  isOpen: false,
  onOpenToggle: () => {},
  onSelectionToggle: () => {},
};

