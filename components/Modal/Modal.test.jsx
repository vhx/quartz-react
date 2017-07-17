import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Modal from './Modal.jsx';
import modalModel from './modalModel';

describe('Modal', () => {
  jsdom();

  afterEach(() => {
    modalModel.close();
  });

  it('Renders', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.exists()).to.equal(true);
    wrapper.unmount();
  });

  it('Opens a modal', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.props().isOpen).to.equal(false);
    modalModel.open({
      actions: [],
      title: 'Testing 12345',
      Children: () => <div>Modal test</div>,
    });
    expect(wrapper.html()).to.include('<div>Modal test</div>');
    expect(wrapper.html()).to.include('Testing 12345');
    expect(wrapper.props().isOpen).to.equal(true);
    wrapper.unmount();
  });

  it('Closes an open modal', () => {
    const wrapper = shallow(<Modal />);
    modalModel.open({
      actions: [],
      title: 'Testing 12345',
      Children: () => <div>Modal test</div>,
    });
    expect(wrapper.props().isOpen).to.equal(true);
    modalModel.close();
    expect(wrapper.props().isOpen).to.equal(false);
    wrapper.unmount();
  });

  it('Renders a single action button in a modal', () => {
    const singleAction = [
      { label: 'Cancel', callback: () => {}, color: 'teal' },
    ];

    const wrapper = shallow(<Modal />);
    const buttonClass = /btn btn--fill/gm;
    modalModel.open({
      actions: singleAction,
      Children: () => <div />,
    });
    expect(wrapper.html().match(buttonClass).length).to.equal(1);
    expect(wrapper.html()).to.include('<div class="btn btn--fill btn-teal">Cancel</div>');
    wrapper.unmount();
  });

  it('Renders two action buttons in a modal', () => {
    const doubleAction = [
      { label: 'Cancel', callback: () => {}, color: 'gray' },
      { label: 'Sign up', callback: () => {}, color: 'teal' },
    ];
    const wrapper = shallow(<Modal />);
    const buttonClass = /btn btn--half/gm;
    modalModel.open({
      actions: doubleAction,
      Children: () => <div />,
    });
    expect(wrapper.html().match(buttonClass).length).to.equal(2);
    expect(wrapper.html()).to.include('<div class="btn btn--half btn-gray">Cancel</div>');
    expect(wrapper.html()).to.include('<div class="btn btn--half btn-teal">Sign up</div>');
    wrapper.unmount();
  });
});
