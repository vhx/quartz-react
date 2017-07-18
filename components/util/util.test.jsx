import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import {
  If,
  truncate,
  excludeProps,
  select,
  multiSelect,
  getAspectRatioHeight,
  immutableMerge,
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

  describe('select', () => {
    it('Toggles an option in an object', () => {
      expect(select({ foo: true, bar: false }, 'foo')).to.deep.equal({ foo: false, bar: false });
    });
    it('Sets all other options to false', () => {
      expect(select({ foo: true, bar: false, baz: false }, 'bar')).to.deep.equal({ foo: false, bar: true, baz: false });
    });
    it('Does not modiy source object', () => {
      const source = { foo: true, bar: false };
      const output = select(source, 'bar');
      expect(source).to.deep.equal({ foo: true, bar: false });
      expect(output).to.deep.equal({ foo: false, bar: true });
    });
    it('Works with undefined values', () => {
      expect(select({ foo: false }, 'bar')).to.deep.equal({ foo: false, bar: true });
    });
  });

  describe('multiSelect', () => {
    it('Toggles an option in an object', () => {
      expect(multiSelect({ foo: true, bar: false }, 'foo')).to.deep.equal({ foo: false, bar: false });
    });
    it('Leaves other options alone', () => {
      expect(multiSelect({ foo: true, bar: false, baz: false }, 'bar')).to.deep.equal({ foo: true, bar: true, baz: false });
    });
    it('Does not modiy source object', () => {
      const source = { foo: true, bar: false };
      const output = multiSelect(source, 'bar');
      expect(source).to.deep.equal({ foo: true, bar: false });
      expect(output).to.deep.equal({ foo: true, bar: true });
    });
    it('Works with undefined values', () => {
      expect(multiSelect({ foo: false }, 'bar')).to.deep.equal({ foo: false, bar: true });
    });
  });

  describe('getAspectRatioHeight', () => {
    it('Returns height given aspect ratio and width', () => {
      expect(getAspectRatioHeight('16:9', 1920)).to.equal(1080);
      expect(getAspectRatioHeight('16:9', 1280)).to.equal(720);
      expect(getAspectRatioHeight('16:7', 1280)).to.equal(560);
      expect(getAspectRatioHeight('16:6', 1920)).to.equal(720);
    });
  });

  describe('immutableMerge', () => {
    it('Merges objects and freezes', () => {
      const x = { foo: 123 };
      const y = { foo: 456, bar: 567 };
      const z = { baz: 789 };
      const merged = immutableMerge(x, y, z);
      expect(x).to.deep.equal({ foo: 123 });
      expect(y).to.deep.equal({ foo: 456, bar: 567 });
      expect(z).to.deep.equal({ baz: 789 });
      expect(merged).to.deep.equal({ foo: 456, bar: 567, baz: 789 });
    });
  });

  describe('Model', () => {
    it('sets initial state');
    it('is immutable');
    it('can be provided methods');
    it('merges return value from methods into state');
    it('can be subscribed to');
    it('can be unsubscribed from');
  });

  describe('connect', () => {
    it('connects a component to a model');
    it('passes model state as props to the component');
  });
});
