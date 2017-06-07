import React, { Component } from 'react';
import { Checkbox } from '../../index.js';

export default class CheckboxDemo extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return <Checkbox { ...this.props } checked={this.state.checked} onChange={this.toggle} />;
  }
}

CheckboxDemo.propTypes = Checkbox.propTypes;
CheckboxDemo.defaultProps = Checkbox.defaultProps;
