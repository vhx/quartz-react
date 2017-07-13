import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from './Header.jsx';

describe('Header', () => {
  jsdom();

  it('Renders without border', () => {
    const wrapper = shallow(<Header title='t' icon='cog' border={false} />);
    expect(wrapper.html()).to.not.include('border-bottom');
    expect(wrapper.exists()).to.equal(true);
  });

  it('Renders with border', () => {
    const wrapper = shallow(<Header title='t' icon='cog' border />);
    expect(wrapper.html()).to.include('border-bottom');
    expect(wrapper.exists()).to.equal(true);
  });

  it('Accepts description as string', () => {
    const wrapper = shallow(<Header title='t' icon='cog' Description='foo' />);
    expect(wrapper.html().includes('foo')).to.equal(true);
  });

  it('Accepts description as component', () => {
    const wrapper = shallow(<Header title='t' icon='cog' Description={() => <p>bar</p>} />);
    expect(wrapper.html().includes('bar')).to.equal(true);
  });

  it('Renders children', () => {
    const wrapper = shallow(<Header title='t' icon='cog'><button>baz</button></Header>);
    expect(wrapper.html().includes('baz')).to.equal(true);
  });
});
