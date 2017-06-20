import jsdom from 'mocha-jsdom';
import React, { Component } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Checkbox from './Checkbox.jsx';

// NOTE: A stateful component is used here to test state changes when the checkbox is toggled.
class StatefulCheckbox extends Component {
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

describe('Checkbox', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = mount(<Checkbox uniqueId='checkbox1' />);
    expect(wrapper.exists()).to.equal(true);
  });

  it('Defaults to unchecked', () => {
    const wrapper = mount(<Checkbox uniqueId='checkbox2' />);
    expect(wrapper.prop('checked')).to.equal(false);
  });

  it('Can be toggled', () => {
    const wrapper = mount(<StatefulCheckbox uniqueId='checkbox3' />);
    expect(wrapper.find('input').node.checked).to.equal(true);
    wrapper.find('input').simulate('change');
    expect(wrapper.find('input').node.checked).to.equal(false);
    wrapper.find('input').simulate('change');
    expect(wrapper.find('input').node.checked).to.equal(true);
  });
});
