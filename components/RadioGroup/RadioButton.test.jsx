import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import RadioButton from './RadioButton.jsx';

describe('RadioButton', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<RadioButton index={0} label='foo' onCheck={() => {}} checked />);
    expect(wrapper.exists()).to.equal(true);
  });

  it('Renders with description', () => {
    const wrapper = shallow(<RadioButton index={0} label='foo' description='bar' onCheck={() => {}} checked />);
    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.radio--label p').text()).to.equal('bar');
  });

  it('Fires onCheck event when toggled', () => {
    let callCount = 0;
    const fn = (event, index) => {
      expect(index).to.equal(123);
      callCount++;
    };
    const wrapper = shallow(<RadioButton index={123} label='foo' onCheck={fn} checked />);
    const checkbox = wrapper.find('input');
    checkbox.simulate('change');
    expect(callCount).to.equal(1);
  });

  it('Fires onCheck event when label is clicked', () => {
    let callCount = 0;
    const fn = (event, index) => {
      expect(index).to.equal(456);
      callCount++;
    };
    const wrapper = shallow(<RadioButton index={456} label='foo' onCheck={fn} checked />);
    const label = wrapper.find('label');
    label.simulate('click');
    expect(callCount).to.equal(1);
  });
});
