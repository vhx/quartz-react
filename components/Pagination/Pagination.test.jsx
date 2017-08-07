import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Text from './Text.jsx';

describe('Text', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<Text>foo</Text>);
    expect(wrapper.exists()).to.equal(true);
  });
});
