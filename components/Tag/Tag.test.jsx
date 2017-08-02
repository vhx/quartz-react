import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Tag from './Tag.jsx';

describe('Tag', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<Tag label='foo' />);
    expect(wrapper.exists()).to.equal(true);
  });

  it('Accepts click events', () => {
    let callCount = 0;
    const handleClick = () => callCount++;
    const wrapper = shallow(<Tag onClick={handleClick} label='foo' />);
    expect(callCount).to.equal(0);
    wrapper.find('.tagLeft').simulate('click');
    expect(callCount).to.equal(1);
  });

  it('Accepts remove click events', () => {
    let callCount = 0;
    const handleClick = () => callCount++;
    const wrapper = shallow(<Tag onRemove={handleClick} label='foo' />);
    expect(callCount).to.equal(0);
    wrapper.find('.tagRight').simulate('click');
    expect(callCount).to.equal(1);
  });

  it('Truncates text beyond specified length', () => {
    const wrapper = shallow(<Tag label='123456789' maxLength={3} />);
    expect(wrapper.find('.tagLeft').text()).to.equal('123...');
  });
});
