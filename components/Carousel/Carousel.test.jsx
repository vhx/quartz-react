import jsdom from 'mocha-jsdom';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Carousel from './Carousel.jsx';

const slides = [
  { id: 'S0', Slide: () => <div className='slide'>slide 0</div> },
  { id: 'S1', Slide: () => <div className='slide'>slide 1</div> },
  { id: 'S2', Slide: () => <div className='slide'>slide 2</div> },
];

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Carousel', () => {
  jsdom();

  it('Renders', () => {
    const wrapper = shallow(<Carousel slides={slides} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it('Displays the <Slide> components passed in', () => {
    const wrapper = mount(<Carousel slides={slides} />);
    const slideElements = wrapper.find('.carousel-slides');
    expect(slideElements.find('.slide').length).to.equal(slides.length);
    expect(slideElements.html()).to.include('<div class="slide">slide 0</div>');
    expect(slideElements.html()).to.include('<div class="slide">slide 1</div>');
    expect(slideElements.html()).to.include('<div class="slide">slide 2</div>');
  });

  it('Displays a coin for each slide', () => {
    const wrapper = mount(<Carousel slides={slides} />);
    const coins = wrapper.find('.coin');
    expect(coins.length).to.equal(slides.length);
  });

  it('Defaults to first slide', () => {
    const wrapper = mount(<Carousel slides={slides} />);
    expect(wrapper.state('topSlideIndex')).to.equal(0);
  });

  it('Navigates forward', async () => {
    const ANIMATION_DURATION = 10;
    const wrapper = mount(<Carousel slides={slides} animationDuration={ANIMATION_DURATION} />);
    const nextArrow = wrapper.find('.carousel-arrow--right');
    expect(wrapper.state('topSlideIndex')).to.equal(0);
    nextArrow.simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(1);
    nextArrow.simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(2);
    nextArrow.simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(0); // wraps around to first slide
  });

  it('Navigates backward', async () => {
    const ANIMATION_DURATION = 10;
    const wrapper = mount(<Carousel slides={slides} animationDuration={ANIMATION_DURATION} />);
    const prevArrow = wrapper.find('.carousel-arrow--left');
    expect(wrapper.state('topSlideIndex')).to.equal(0);
    prevArrow.simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(2);
    prevArrow.simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(1);
    prevArrow.simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(0);
  });

  it('Navigates to specific slide', async () => {
    const ANIMATION_DURATION = 10;
    const wrapper = mount(<Carousel slides={slides} animationDuration={ANIMATION_DURATION} />);
    expect(wrapper.state('topSlideIndex')).to.equal(0);
    wrapper.find('.coin').at(1).simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(1);
    wrapper.find('.coin').at(0).simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(0);
    wrapper.find('.coin').at(2).simulate('click');
    await wait(ANIMATION_DURATION);
    expect(wrapper.state('topSlideIndex')).to.equal(2);
  });

  it('Does not display navigation ui for single slide', () => {
    const wrapper = mount(<Carousel slides={slides.slice(0, 1)} />);
    expect(wrapper.find('.coin').length).to.equal(0);
    expect(wrapper.find('.carousel-arrow--left').length).to.equal(0);
    expect(wrapper.find('.carousel-arrow--right').length).to.equal(0);
  });
});
