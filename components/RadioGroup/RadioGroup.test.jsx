import jsdom from 'mocha-jsdom';
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import RadioGroup from './RadioGroup.jsx';

// NOTE: A stateful component is used here to test state changes when the RadioGroup is changed.
// For example: `expect(wrapper.state().selectedIndex).to.equal(2);`
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

const radioItems = [
  { label: 'Radio item 1', uniqueId: 'item1' },
  { label: 'Radio item 2', uniqueId: 'item2' },
  { label: 'Radio item 3', uniqueId: 'item3' },
];

describe('RadioGroup', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<RadioGroup items={radioItems} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it('Defaults to all unchecked', () => {
    const wrapper = mount(<RadioGroup items={radioItems} />);
    expect(wrapper.find('input').length).to.equal(3);
    wrapper.find('input').forEach((input) => {
      expect(input.html()).to.equal('<input type="radio">');
      expect(input.node.checked).to.equal(false);
    });
  });

  it('Can have a default checked', () => {
    const wrapper = mount(<RadioGroup selectedIndex={1} items={radioItems} />);
    const inputs = wrapper.find('input');
    expect(inputs.length).to.equal(3);
    expect(inputs.get(0).checked).to.equal(false);
    expect(inputs.get(1).checked).to.equal(true);
    expect(inputs.get(2).checked).to.equal(false);
  });

  it('Can be toggled', () => {
    const wrapper = mount(<StatefulRadio items={radioItems} />);
    const inputs = wrapper.find('input');
    expect(wrapper.state().selectedIndex).to.equal(0);
    expect(inputs.get(0).checked).to.equal(true);
    expect(inputs.get(1).checked).to.equal(false);
    expect(inputs.get(2).checked).to.equal(false);
    inputs.last().simulate('change');
    expect(wrapper.state().selectedIndex).to.equal(2);
    expect(inputs.get(0).checked).to.equal(false);
    expect(inputs.get(1).checked).to.equal(false);
    expect(inputs.get(2).checked).to.equal(true);
  });
});
