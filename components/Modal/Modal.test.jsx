import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Modal from './Modal.jsx';

describe('Modal', () => {
  jsdom();

  // shared wrapper, since modal can only be instantiated once
  const wrapper = shallow(<Modal />);

  afterEach(() => {
    Modal.close();
  });

  it('Renders', () => {
    expect(wrapper.exists()).to.equal(true);
  });

  it('Opens a modal', () => {
    expect(wrapper.props().isOpen).to.equal(false);
    Modal.open({
      actions: [],
      title: 'Testing 12345',
      Children: () => <div>Modal test</div>,
    });
    expect(wrapper.html()).to.include('<div>Modal test</div>');
    expect(wrapper.html()).to.include('Testing 12345');
    expect(wrapper.props().isOpen).to.equal(true);
  });

  it('Closes an open modal', () => {
    Modal.open({
      actions: [],
      title: 'Testing 12345',
      Children: () => <div>Modal test</div>,
    });
    expect(wrapper.props().isOpen).to.equal(true);
    Modal.close();
    expect(wrapper.props().isOpen).to.equal(false);
  });

  it('Renders a single action button in a modal', () => {
    const singleAction = [
      { label: 'Cancel', callback: () => {}, color: 'teal' },
    ];

    const buttonClass = /btn btn--fill/gm;
    Modal.open({
      actions: singleAction,
      Children: () => <div />,
    });
    expect(wrapper.html().match(buttonClass).length).to.equal(1);
    expect(wrapper.html()).to.include('<div class="btn btn--fill btn-teal">Cancel</div>');
  });

  it('Renders two action buttons in a modal', () => {
    const doubleAction = [
      { label: 'Cancel', callback: () => {}, color: 'gray' },
      { label: 'Sign up', callback: () => {}, color: 'teal' },
    ];
    const buttonClass = /btn btn--half/gm;
    Modal.open({
      actions: doubleAction,
      Children: () => <div />,
    });
    expect(wrapper.html().match(buttonClass).length).to.equal(2);
    expect(wrapper.html()).to.include('<div class="btn btn--half btn-gray">Cancel</div>');
    expect(wrapper.html()).to.include('<div class="btn btn--half btn-teal">Sign up</div>');
  });
});
