import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sidebar from './Sidebar.jsx';

describe('Sidebar', () => {
  jsdom();

  describe('Component', () => {
    afterEach(() => {
      Sidebar.close();
    });

    // shared wrapper, since sidebar can only be instantiated once
    const wrapper = shallow(<Sidebar />);

    it('Renders', () => {
      expect(wrapper.exists()).to.equal(true);
    });

    it('Defaults to closed state', () => {
      expect(wrapper.props().isOpen).to.equal(false);
    });

    it('Can be opened / closed / toggled', () => {
      expect(wrapper.props().isOpen).to.equal(false);

      // open:
      const Children = () => <div />;
      Sidebar.open(Children);
      expect(wrapper.props().isOpen).to.equal(true);

      // close:
      Sidebar.close();
      expect(wrapper.props().isOpen).to.equal(false);

      // toggle:
      Sidebar.toggle(Children);
      expect(wrapper.props().isOpen).to.equal(true);
      Sidebar.toggle(Children);
      expect(wrapper.props().isOpen).to.equal(false);
      Sidebar.toggle(Children);
      expect(wrapper.props().isOpen).to.equal(true);
      Sidebar.toggle(Children);
      expect(wrapper.props().isOpen).to.equal(false);
    });

    it('Can reopen last opened sidebar', () => {
      const Children = () => <div>hi</div>;
      Sidebar.open(Children);
      Sidebar.close();
      Sidebar.open();
      expect(wrapper.html()).to.include('<div>hi</div>');
    });
  });

  describe('Model', () => {
    afterEach(() => {
      Sidebar.close();
    });

    it('Is possible to access current state', () => {
      const Children = () => <div />;
      expect(Sidebar.state.isOpen).to.equal(false);
      Sidebar.toggle(Children);
      expect(Sidebar.state.isOpen).to.equal(true);
      Sidebar.toggle(Children);
      expect(Sidebar.state.isOpen).to.equal(false);
      Sidebar.close();
    });

    it('Cannot directly manipulate state', () => {
      expect(Sidebar.state.isOpen).to.equal(false);
      expect(() => {
        Sidebar.state.isOpen = true;
      }).to.throw();
    });

    it('Can subscribe to state changes', () => {
      let callCount = 0;
      const Children = () => <div />;
      function onUpdate(state) {
        expect(typeof state.isOpen).to.equal('boolean');
        callCount++;
      }
      Sidebar.subscribe(onUpdate);
      Sidebar.open(Children);
      Sidebar.close();
      Sidebar.toggle(Children);
      expect(callCount).to.equal(3);
      Sidebar.unsubscribe(onUpdate);
      Sidebar.close();
    });

    it('Can unsubscribe from changes', () => {
      let callCount = 0;
      const Children = () => <div />;
      function onUpdate(state) {
        expect(typeof state.isOpen).to.equal('boolean');
        callCount++;
      }
      Sidebar.subscribe(onUpdate);
      Sidebar.open(Children);
      Sidebar.close();
      Sidebar.toggle(Children);
      expect(callCount).to.equal(3);
      Sidebar.unsubscribe(onUpdate);
      Sidebar.close();
      Sidebar.close();
      Sidebar.close();
      Sidebar.close();
      Sidebar.close();
      Sidebar.close();
      expect(callCount).to.equal(3);
      Sidebar.close();
    });
  });
});
