import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sidebar from './Sidebar.jsx';

describe('Sidebar', () => {
  jsdom();

  afterEach(() => {
    Sidebar.close();
  });

  it('Renders', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.exists()).to.equal(true);
  });

  it('Defaults to closed state', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.state().isOpen).to.equal(false);
  });

  it('Can be opened / closed / toggled', () => {
    const wrapper = shallow(<Sidebar />);
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
  });
});
