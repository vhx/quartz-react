import React, { Component } from 'react';
import { Input } from '../../index.js';

class StatefulInput extends Component {

  constructor() {
    super();
    this.state = { value: '' };
    this.setValue = this.setValue.bind(this);
  }

  setValue(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Input
        {...this.props}
        onInput={this.setValue}
        value={this.state.value}
      />
    );
  }
}

export default StatefulInput;
