import jsdom from 'mocha-jsdom';
import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { expect } from 'chai';
import Pagination from './Pagination.jsx';

describe('Pagination', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<Pagination length={1} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it('Handles length: 0', () => {
    const wrapper = render(<Pagination length={0} />);
    expect(wrapper.text()).to.equal('');
  });

  it('[1]', () => {
    const wrapper = render(<Pagination length={1} />);
    expect(wrapper.text()).to.include('1');
  });

  it('[1] 2 ->', () => {
    const wrapper = render(<Pagination length={2} />);
    expect(wrapper.text()).to.include('12');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('1');
    expect(wrapper.find('.pagination-link.invisible').text()).to.include('Previous');
  });

  it('<- 1 [2]', () => {
    const wrapper = render(<Pagination length={2} currentIndex={1} />);
    expect(wrapper.text()).to.include('12');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('2');
    expect(wrapper.find('.pagination-link.invisible').text()).to.include('Next');
  });

  it('[1] 2 3 ->', () => {
    const wrapper = render(<Pagination length={3} />);
    expect(wrapper.text()).to.include('123');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('1');
    expect(wrapper.find('.pagination-link.invisible').text()).to.include('Previous');
  });

  it('<- 1 [2] 3 ->', () => {
    const wrapper = render(<Pagination length={3} currentIndex={1} />);
    expect(wrapper.text()).to.include('123');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('2');
    expect(wrapper.html()).to.not.include('.pagination-link.invisible');
  });

  it('<- 1 2 [3]', () => {
    const wrapper = render(<Pagination length={3} currentIndex={2} />);
    expect(wrapper.text()).to.include('123');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('3');
    expect(wrapper.find('.pagination-link.invisible').text()).to.include('Next');
  });

  it('[1] 2 3 4 5 6 7 ->', () => {
    const wrapper = render(<Pagination length={7} />);
    expect(wrapper.text()).to.include('1234567');
    expect(wrapper.text()).to.not.include('...');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('1');
    expect(wrapper.find('.pagination-link.invisible').text()).to.include('Previous');
  });

  it('[1] 2 3 4 5 ... 8 ->', () => {
    const wrapper = render(<Pagination length={8} />);
    expect(wrapper.text()).to.include('12345...8');
    expect(wrapper.text()).to.not.include('6');
    expect(wrapper.text()).to.not.include('7');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('1');
    expect(wrapper.find('.pagination-link.invisible').text()).to.include('Previous');
  });

  it('<- 1 [2] 3 4 5 ... 8 ->', () => {
    const wrapper = render(<Pagination length={8} currentIndex={1} />);
    expect(wrapper.text()).to.include('12345...8');
    expect(wrapper.text()).to.not.include('6');
    expect(wrapper.text()).to.not.include('7');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('2');
    expect(wrapper.html()).to.not.include('invisible');
  });

  it('<- 1 ... 4 [5] 6 7 8 ->', () => {
    const wrapper = render(<Pagination length={8} currentIndex={4} />);
    expect(wrapper.text()).to.include('1...45678');
    expect(wrapper.text()).to.not.include('2');
    expect(wrapper.text()).to.not.include('3');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('5');
    expect(wrapper.html()).to.not.include('invisible');
  });

  it('<- 1 ... 4 [5] 6 ... 9 ->', () => {
    const wrapper = render(<Pagination length={9} currentIndex={4} />);
    expect(wrapper.text()).to.include('1...456...9');
    expect(wrapper.text()).to.not.include('2');
    expect(wrapper.text()).to.not.include('3');
    expect(wrapper.text()).to.not.include('7');
    expect(wrapper.text()).to.not.include('8');
    expect(wrapper.find('.pagination-button.active').text()).to.equal('5');
    expect(wrapper.html()).to.not.include('invisible');
  });

  it('Handles "Previous" callback', () => {
    let callCount = 0;
    const cb = (newIndex) => {
      callCount++;
      expect(newIndex).to.equal(3);
    };

    const wrapper = mount(<Pagination length={9} currentIndex={4} onPageChange={cb} />);
    wrapper.find('.pagination-link').first().simulate('click');
    expect(callCount).to.equal(1);
  });

  it('Handles "Next" callback', () => {
    let callCount = 0;
    const cb = (newIndex) => {
      callCount++;
      expect(newIndex).to.equal(5);
    };

    const wrapper = mount(<Pagination length={9} currentIndex={4} onPageChange={cb} />);
    wrapper.find('.pagination-link').last().simulate('click');
    expect(callCount).to.equal(1);
  });

  it('Handles button click callback', () => {
    let callCount = 0;
    const cb = (newIndex) => {
      callCount++;
      expect(newIndex).to.equal(0);
    };

    const wrapper = mount(<Pagination length={9} currentIndex={4} onPageChange={cb} />);
    wrapper.find('.pagination-button').first().simulate('click');
    expect(callCount).to.equal(1);
  });
});
