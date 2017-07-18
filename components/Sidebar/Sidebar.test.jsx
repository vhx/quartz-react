import jsdom from 'mocha-jsdom';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Sidebar from './Sidebar.jsx';
import sidebarModel from './sidebarModel';

describe('Sidebar', () => {
  jsdom();

  // shared wrapper, since sidebar can only be instantiated once
  // const wrapper = shallow(<Sidebar />);

  describe('Component', () => {
    it('Renders', () => {
      const wrapper = shallow(<Sidebar />);
      expect(wrapper.exists()).to.equal(true);
      wrapper.unmount();
      sidebarModel.close();
    });

    it('Defaults to closed state', () => {
      const wrapper = shallow(<Sidebar />);
      expect(wrapper.props().isOpen).to.equal(false);
      wrapper.unmount();
      sidebarModel.close();
    });

    it('Can be opened / closed / toggled', () => {
      const wrapper = shallow(<Sidebar />);
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
      wrapper.unmount();
      sidebarModel.close();
    });

    it('Can be closed by clicking sidebar\'s close icon', () => {
      const wrapper = mount(<Sidebar />);
      const Children = () => <div />;
      expect(wrapper.props().isOpen).to.equal(false);
      sidebarModel.open(Children);
      expect(wrapper.props().isOpen).to.equal(true);
      const closeButton = wrapper.find('.c-sidebar--close');
      expect(closeButton.exists()).to.equal(true);
      closeButton.simulate('click');
      expect(wrapper.props().isOpen).to.equal(false);
      wrapper.unmount();
      sidebarModel.close();
    });

    it('Can reopen last opened sidebar', () => {
      const wrapper = shallow(<Sidebar />);
      const Children = () => <div>hi</div>;
      sidebarModel.open(Children);
      sidebarModel.close();
      sidebarModel.open();
      expect(wrapper.html()).to.include('<div>hi</div>');
      wrapper.unmount();
      sidebarModel.close();
    });

    it('Throws if mounting multiple sidebars', () => {
      expect(() => mount(<Sidebar />)).to.throw();
    });
  });

  describe('Model', () => {
    // it('Is possible to access current state', () => {
    //   const Children = () => <div />;
    //   expect(sidebarModel.state.isOpen).to.equal(false);
    //   sidebarModel.toggle(Children);
    //   expect(sidebarModel.state.isOpen).to.equal(true);
    //   sidebarModel.toggle(Children);
    //   expect(sidebarModel.state.isOpen).to.equal(false);
    //   sidebarModel.close();
    // });

    // it('Cannot directly manipulate state', () => {
    //   expect(sidebarModel.state.isOpen).to.equal(false);
    //   expect(() => {
    //     sidebarModel.state.isOpen = true;
    //   }).to.throw();
    // });

    // it('Can subscribe to state changes', () => {
    //   let callCount = 0;
    //   const Children = () => <div />;
    //   function onUpdate(state) {
    //     expect(typeof state.isOpen).to.equal('boolean');
    //     callCount++;
    //   }
    //   sidebarModel.subscribe(onUpdate);
    //   sidebarModel.open(Children);
    //   sidebarModel.close();
    //   sidebarModel.toggle(Children);
    //   expect(callCount).to.equal(3);
    //   sidebarModel.unsubscribe(onUpdate);
    //   sidebarModel.close();
    // });

    // it('Can unsubscribe from changes', () => {
    //   let callCount = 0;
    //   const Children = () => <div />;
    //   function onUpdate(state) {
    //     expect(typeof state.isOpen).to.equal('boolean');
    //     callCount++;
    //   }
    //   sidebarModel.subscribe(onUpdate);
    //   sidebarModel.open(Children);
    //   sidebarModel.close();
    //   sidebarModel.toggle(Children);
    //   expect(callCount).to.equal(3);
    //   sidebarModel.unsubscribe(onUpdate);
    //   sidebarModel.close();
    //   sidebarModel.close();
    //   sidebarModel.close();
    //   sidebarModel.close();
    //   sidebarModel.close();
    //   sidebarModel.close();
    //   expect(callCount).to.equal(3);
    //   sidebarModel.close();
    // });

    // it('Does not do anything if unsubscribing from already unsubscribed listener', () => {
    //   const onUpdate = () => {};
    //   const initialListenerCount = sidebarModel.__listeners.length;
    //   sidebarModel.subscribe(onUpdate);
    //   expect(sidebarModel.__listeners.length).to.equal(initialListenerCount + 1);
    //   sidebarModel.unsubscribe(onUpdate);
    //   expect(sidebarModel.__listeners.length).to.equal(initialListenerCount);
    //   sidebarModel.unsubscribe(onUpdate);
    //   sidebarModel.unsubscribe(onUpdate);
    //   sidebarModel.unsubscribe(onUpdate);
    //   sidebarModel.unsubscribe(onUpdate);
    //   sidebarModel.unsubscribe(onUpdate);
    //   sidebarModel.unsubscribe(onUpdate);
    //   expect(sidebarModel.__listeners.length).to.equal(initialListenerCount);
    //   sidebarModel.close();
    // });

    // it('Does not resubscribe a subscribed listener', () => {
    //   const initialListenerCount = sidebarModel.__listeners.length;
    //   const onUpdate = () => {};
    //   sidebarModel.subscribe(onUpdate);
    //   expect(sidebarModel.__listeners.length).to.equal(initialListenerCount + 1);
    //   sidebarModel.subscribe(onUpdate);
    //   expect(sidebarModel.__listeners.length).to.equal(initialListenerCount + 1); // noteice it is still the same!
    //   sidebarModel.unsubscribe(onUpdate);
    //   sidebarModel.close();
    // });

    // it('Cleans up listeners on unmount', () => {
    //   expect(sidebarModel.__listeners.length).to.equal(1);
    //   wrapper.unmount();
    //   expect(sidebarModel.__listeners.length).to.equal(0);
    // });
  });
});
