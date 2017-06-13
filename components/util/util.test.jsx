import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import {
  If,
  truncate,
  excludeProps,
} from './index.js';

describe('Utilities', () => {
  jsdom();

  describe('If', () => {
    it('Renders children if condition is true', () => {
      const wrapper = shallow(<If condition={true}>hello!</If>);
      expect(wrapper.html()).to.include('hello!');
    });

    it('Does not render children if condition is false', () => {
      const wrapper = shallow(<If condition={false}>hello!</If>);
      expect(wrapper.html()).to.not.include('hello!');
    });
  });

  describe('truncate', () => {
    it('Truncates string if past maxLength', () => {
      expect(truncate('foo-bar-baz', 3)).to.equal('foo...');
    });

    it('Does nothing if not past maxLength', () => {
      expect(truncate('foo', 3)).to.equal('foo');
    });
  });

  describe('excludeProps', () => {
    it('Excludes props from object', () => {
      expect(excludeProps([ 'foo', 'baz' ], {
        foo: 123,
        bar: 456,
        baz: 789,
        quz: 111,
      })).to.deep.equal({
        bar: 456,
        quz: 111,
      });
    });

    it('Does not modify source object', () => {
      const source = { foo: 123, bar: 456 };
      const output = excludeProps([ 'foo' ], source);
      expect(source).to.deep.equal({ foo: 123, bar: 456 });
      expect(output).to.deep.equal({ bar: 456 });
    });
  });
});
