import jsdom from 'mocha-jsdom';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Sidebar from './Sidebar.jsx';
import sidebarModel from './sidebarModel';

describe('Sidebar', () => {
  jsdom();

  describe('Component', () => {
    afterEach(() => {
      sidebarModel.close();
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
      sidebarModel.open(Children);
      expect(wrapper.props().isOpen).to.equal(true);

      // close:
      sidebarModel.close();
      expect(wrapper.props().isOpen).to.equal(false);

      // toggle:
      sidebarModel.toggle(Children);
      expect(wrapper.props().isOpen).to.equal(true);
      sidebarModel.toggle(Children);
      expect(wrapper.props().isOpen).to.equal(false);
      sidebarModel.toggle(Children);
      expect(wrapper.props().isOpen).to.equal(true);
      sidebarModel.toggle(Children);
      expect(wrapper.props().isOpen).to.equal(false);
    });

    it('Can reopen last opened sidebar', () => {
      const Children = () => <div>hi</div>;
      sidebarModel.open(Children);
      sidebarModel.close();
      sidebarModel.open();
      expect(wrapper.html()).to.include('<div>hi</div>');
    });
  });

  describe('Model', () => {
    afterEach(() => {
      sidebarModel.close();
    });

    it('Is possible to access current state', () => {
      const Children = () => <div />;
      expect(sidebarModel.state.isOpen).to.equal(false);
      sidebarModel.toggle(Children);
      expect(sidebarModel.state.isOpen).to.equal(true);
      sidebarModel.toggle(Children);
      expect(sidebarModel.state.isOpen).to.equal(false);
      sidebarModel.close();
    });

    it('Cannot directly manipulate state', () => {
      expect(sidebarModel.state.isOpen).to.equal(false);
      expect(() => {
        sidebarModel.state.isOpen = true;
      }).to.throw();
    });

    it('Can subscribe to state changes', () => {
      let callCount = 0;
      const Children = () => <div />;
      function onUpdate(state) {
        expect(typeof state.isOpen).to.equal('boolean');
        callCount++;
      }
      sidebarModel.subscribe(onUpdate);
      sidebarModel.open(Children);
      sidebarModel.close();
      sidebarModel.toggle(Children);
      expect(callCount).to.equal(3);
      sidebarModel.unsubscribe(onUpdate);
      sidebarModel.close();
    });

    it('Can unsubscribe from changes', () => {
      let callCount = 0;
      const Children = () => <div />;
      function onUpdate(state) {
        expect(typeof state.isOpen).to.equal('boolean');
        callCount++;
      }
      sidebarModel.subscribe(onUpdate);
      sidebarModel.open(Children);
      sidebarModel.close();
      sidebarModel.toggle(Children);
      expect(callCount).to.equal(3);
      sidebarModel.unsubscribe(onUpdate);
      sidebarModel.close();
      sidebarModel.close();
      sidebarModel.close();
      sidebarModel.close();
      sidebarModel.close();
      sidebarModel.close();
      expect(callCount).to.equal(3);
      sidebarModel.close();
    });
  });
});
