import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { If } from '../util';
import Icon from '../Icon';


// --------------------------------------------------------------------------
// ------------------------------------- carousel.jsx
// --------------------------------------------------------------------------

function next(length, count) {
  return (count + 1) % length;
}

function prev(length, count) {
  return (count - 1) < 0 ? (length - 1) : (count - 1);
}

const StatelessCarousel = ({ currentSlide, height, isReady, onSlideChange, slides }) => {
  const hasMoreThanOneSlide = slides.length > 1;
  const gotoPrev = () => onSlideChange(prev(slides.length, currentSlide));
  const gotoNext = () => onSlideChange(next(slides.length, currentSlide));
  return (
    <div className='carousel' style={{ height: `${height}px` }}>
      <div>
        { slides.map((Slide, i) => <Slide key={i} isActive={currentSlide === i} isReady={isReady} />) }
      </div>
      <If condition={hasMoreThanOneSlide}>
        <button className='carousel-arrow carousel-arrow--left' onClick={gotoPrev}><Icon name='angle-left' color='white' size='small' /></button>
        <button className='carousel-arrow carousel-arrow--right' onClick={gotoNext}><Icon name='angle-right' color='white' size='small' /></button>
        <div className='coins'>
          { slides.map((Slide, i) => <button key={i} onClick={() => onSlideChange(i)} disabled={currentSlide === i} className={currentSlide === i ? 'coin active' : 'coin'} />) }
        </div>
      </If>
    </div>
  );
};

StatelessCarousel.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired, // currently passing in height dynamically, but this could also be done in css if it will never change
  isReady: PropTypes.bool.isRequired, // currently passing in height dynamically, but this could also be done in css if it will never change
  onSlideChange: PropTypes.func.isRequired,
  slides: PropTypes.arrayOf(PropTypes.func).isRequired,
};

// --------------------------------------------------------------------------
// ------------------------------------- demo/src/demo-carousel.jsx
// --------------------------------------------------------------------------
class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
      isReady: false,
    };
    this.setSlide = this.setSlide.bind(this);
  }
  setSlide(currentSlide) {
    this.setState({ currentSlide, isReady: true });
  }
  render() {
    return (
      <StatelessCarousel currentSlide={this.state.currentSlide} onSlideChange={this.setSlide} height={700} isReady={this.state.isReady} slides={this.props.slides} />
    );
  }
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default Carousel;
