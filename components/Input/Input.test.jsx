import jsdom from 'mocha-jsdom';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Input from './Input.jsx';

describe('Input', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = mount(<Input value='' />);
    expect(wrapper.exists()).to.equal(true);
  });

  it('Accepts input events', () => {
    let callCount = 0;
    const handleInput = () => callCount++;
    const wrapper = mount(<Input onInput={handleInput} value='' />);
    expect(callCount).to.equal(0);
    wrapper.find('input').simulate('input');
    expect(callCount).to.equal(1);
  });

  it('Accepts arbitrary HTML attributes', () => {
    const wrapper = mount(<Input name='foo' id='123' value='' />);
    expect(wrapper.find('input').node.getAttribute('name')).to.equal('foo');
    expect(wrapper.find('input').node.getAttribute('id')).to.equal('123');
  });
});
