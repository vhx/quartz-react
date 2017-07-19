import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Avatar from './Avatar.jsx';

describe('Avatar', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<Avatar />);
    expect(wrapper.exists()).to.equal(true);
  });
});
