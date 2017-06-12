import jsdom from 'mocha-jsdom';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Button from './button';

describe('Button', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = mount(<Button>foo</Button>);
    expect(wrapper.props().children).to.equal('foo');
  });

  it('Accepts click events', () => {
    let callCount = 0;
    const handleClick = () => callCount++;
    const wrapper = mount(<Button onClick={handleClick}>foo</Button>);
    expect(callCount).to.equal(0);
    wrapper.find('button').simulate('click');
    expect(callCount).to.equal(1);
  });

  it('Accepts arbitrary HTML attributes', () => {
    const wrapper = mount(<Button attrs={{ height: 20, id: '123' }}>foo</Button>);
    expect(wrapper.find('button').node.getAttribute('height')).to.equal('20'); // html attrs are coerced to strings
    expect(wrapper.find('button').node.getAttribute('id')).to.equal('123');
  });
});
