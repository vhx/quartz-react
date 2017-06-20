import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Icon from './Icon.jsx';

describe('Icon', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<Icon name='product' />);
    expect(wrapper.exists()).to.equal(true);
  });
});
