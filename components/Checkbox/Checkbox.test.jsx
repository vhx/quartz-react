import jsdom from 'mocha-jsdom';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Checkbox from './Checkbox.jsx';

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
    let checked = false;
    const toggle = () => { checked = !checked; };
    const wrapper = mount(<Checkbox uniqueId='checkbox2' checked={checked} onChange={toggle} />);
    expect(wrapper.prop('checked')).to.equal(false);
    wrapper.find('input').simulate('change');
    expect(checked).to.equal(true);
    wrapper.find('input').simulate('change');
    expect(checked).to.equal(false);
  });
});
