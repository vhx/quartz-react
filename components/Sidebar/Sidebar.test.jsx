import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sidebar from './Sidebar.jsx';

describe('Sidebar', () => {
  jsdom();

  // shared wrapper, since sidebar can only be instantiated once
  const wrapper = shallow(<Sidebar />);

  afterEach(() => {
    Sidebar.close();
  });

  it('Renders', () => {
    expect(wrapper.exists()).to.equal(true);
    wrapper.unmount();
  });

  it('Defaults to closed state', () => {
    expect(wrapper.state().isOpen).to.equal(false);
    wrapper.unmount();
  });

  it('Can be opened / closed / toggled', () => {
    expect(wrapper.state().isOpen).to.equal(false);

    // open:
    const Children = () => <div />;
    Sidebar.open(Children);
    expect(wrapper.state().isOpen).to.equal(true);

    // close:
    Sidebar.close();
    expect(wrapper.state().isOpen).to.equal(false);

    // toggle:
    Sidebar.toggle(Children);
    expect(wrapper.state().isOpen).to.equal(true);
    Sidebar.toggle(Children);
    expect(wrapper.state().isOpen).to.equal(false);
    Sidebar.toggle(Children);
    expect(wrapper.state().isOpen).to.equal(true);
    wrapper.unmount();
  });

  it('Can be closed by clicking sidebar\'s close icon', () => {
    const wrapper = shallow(<Sidebar />);
    const Children = () => <div />;
    expect(wrapper.state().isOpen).to.equal(false);
    Sidebar.open(Children);
    expect(wrapper.state().isOpen).to.equal(true);
    const closeButton = wrapper.find('.c-sidebar--close');
    expect(closeButton.exists()).to.equal(true);
    closeButton.simulate('click');
    expect(wrapper.state().isOpen).to.equal(false);
    wrapper.unmount();
  });

  it('Can reopen last opened sidebar', () => {
    const wrapper = shallow(<Sidebar />);
    const Children = () => <div>hi</div>;
    Sidebar.open(Children);
    Sidebar.close();
    Sidebar.open();
    expect(wrapper.html()).to.include('<div>hi</div>');
    wrapper.unmount();
  });

  describe('Sidebar model', () => {
    it('Is possible to access current state', () => {
      const Children = () => <div />;
      expect(Sidebar.model.state.isOpen).to.equal(false);
      Sidebar.toggle(Children);
      expect(Sidebar.model.state.isOpen).to.equal(true);
      Sidebar.toggle(Children);
      expect(Sidebar.model.state.isOpen).to.equal(false);
    });

    it('Cannot directly manipulate state', () => {
      expect(Sidebar.model.state.isOpen).to.equal(false);
      expect(() => {
        Sidebar.model.state.isOpen = true;
      }).to.throw();
    });

    it('Can subscribe to state changes', () => {
      let callCount = 0;
      const Children = () => <div />;
      function onUpdate(state) {
        expect(typeof state.isOpen).to.equal('boolean');
        callCount++;
      }
      Sidebar.model.subscribe(onUpdate);
      Sidebar.open(Children);
      Sidebar.close();
      Sidebar.toggle(Children);
      expect(callCount).to.equal(3);
      Sidebar.model.unsubscribe(onUpdate);
    });

    it('Can unsubscribe from changes', () => {
      let callCount = 0;
      const Children = () => <div />;
      function onUpdate(state) {
        expect(typeof state.isOpen).to.equal('boolean');
        callCount++;
      }
      Sidebar.model.subscribe(onUpdate);
      Sidebar.open(Children);
      Sidebar.close();
      Sidebar.toggle(Children);
      expect(callCount).to.equal(3);
      Sidebar.model.unsubscribe(onUpdate);
      Sidebar.close();
      Sidebar.close();
      Sidebar.close();
      Sidebar.close();
      Sidebar.close();
      Sidebar.close();
      expect(callCount).to.equal(3);
    });

    it('Does not do anything if unsubscribing from already unsubscribed listener', () => {
      const onUpdate = () => {};
      const initialListenerCount = Sidebar.model.listeners.length;
      Sidebar.model.subscribe(onUpdate);
      expect(Sidebar.model.listeners.length).to.equal(initialListenerCount + 1);
      Sidebar.model.unsubscribe(onUpdate);
      expect(Sidebar.model.listeners.length).to.equal(initialListenerCount);
      Sidebar.model.unsubscribe(onUpdate);
      Sidebar.model.unsubscribe(onUpdate);
      Sidebar.model.unsubscribe(onUpdate);
      Sidebar.model.unsubscribe(onUpdate);
      Sidebar.model.unsubscribe(onUpdate);
      Sidebar.model.unsubscribe(onUpdate);
      expect(Sidebar.model.listeners.length).to.equal(initialListenerCount);
    });

    it('Does not resubscribe a subscribed listener', () => {
      const initialListenerCount = Sidebar.model.listeners.length;
      const onUpdate = () => {};
      Sidebar.model.subscribe(onUpdate);
      expect(Sidebar.model.listeners.length).to.equal(initialListenerCount + 1);
      Sidebar.model.subscribe(onUpdate);
      expect(Sidebar.model.listeners.length).to.equal(initialListenerCount + 1); // noteice it is still the same!
      Sidebar.model.unsubscribe(onUpdate);
    });
  });

  it('Cleans up listeners on unmount', () => {
    expect(Sidebar.model.listeners.length).to.equal(0);
    const wrapper = shallow(<Sidebar />);
    expect(Sidebar.model.listeners.length).to.equal(1);
    wrapper.unmount();
    expect(Sidebar.model.listeners.length).to.equal(0);
  });

  it('Warns if mounting multiple sidebars', () => {
    const oldWarn = console.warn;
    let callCount = 0;
    console.warn = () => callCount++;
    const wrapper = shallow(<Sidebar />);
    const wrapper2 = shallow(<Sidebar />);
    expect(callCount).to.equal(1);
    wrapper.unmount();
    wrapper2.unmount();
    console.warn = oldWarn;
  });
});
