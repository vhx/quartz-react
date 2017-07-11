import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sidebar from './Sidebar.jsx';

describe('Sidebar', () => {
  jsdom();

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
});
