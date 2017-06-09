import React, { Component } from 'react';
import { RadioGroup } from '../../index.js';

class StatefulRadio extends Component {

  constructor() {
    super();
    this.state = { selectedIndex: 0 };
    this.setIndex = this.setIndex.bind(this);
  }

  setIndex(event, selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    return (
      <RadioGroup
        selectedIndex={this.state.selectedIndex}
        onCheck={this.setIndex}
        {...this.props}
      />
    );
  }
}

export default StatefulRadio;
