import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Modal from './Modal.jsx';

describe('Modal', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.exists()).to.equal(true);
  });
});
