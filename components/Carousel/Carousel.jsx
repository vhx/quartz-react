import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { If } from '../util';
import Icon from '../Icon';


// --------------------------------------------------------------------------
// ------------------------------------- slide.jsx
// --------------------------------------------------------------------------
function getClass({ isActive, isPrior }) {
  return classNames({
    slide: true,
    isActive,
    isPrior,
  });
}

const Slide = ({ isActive, isPrior, children }) => (
  <div className={getClass({ isActive, isPrior })}>
    <div className='slide-gradient' />
    <div className='slide-body'>{children}</div>
  </div>
);

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPrior: PropTypes.bool.isRequired,
};

// --------------------------------------------------------------------------
// ------------------------------------- carousel.jsx
// --------------------------------------------------------------------------

function next(length, count) {
  return (count + 1) % length;
}

function prev(length, count) {
  return (count - 1) < 0 ? (length - 1) : (count - 1);
}

const StatelessCarousel = ({ children, height, currentSlide, priorSlide, onSlideChange }) => {
  const hasMoreThanOneSlide = Array.isArray(children);
  const slideCount = hasMoreThanOneSlide ? children.length : 1;
  const gotoPrev = () => onSlideChange(prev(slideCount, currentSlide), currentSlide);
  const gotoNext = () => onSlideChange(next(slideCount, currentSlide), currentSlide);
  return (
    <div className='carousel' style={{ height: `${height}px` }}>
      <div>
        { React.Children.map(children, (slide, i) => <Slide isActive={currentSlide === i} isPrior={priorSlide === i}>{slide}</Slide>) }
      </div>
      <If condition={hasMoreThanOneSlide}>
        <button className='carousel-arrow carousel-arrow--left' onClick={gotoPrev}><Icon name='angle-left' color='white' size='small' /></button>
        <button className='carousel-arrow carousel-arrow--right' onClick={gotoNext}><Icon name='angle-right' color='white' size='small' /></button>
        <div className='coins'>
          { React.Children.map(children, (slide, i) => <button onClick={() => onSlideChange(i, currentSlide)} disabled={currentSlide === i} className={currentSlide === i ? 'coin active' : 'coin'} />) }
        </div>
      </If>
    </div>
  );
};

StatelessCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  currentSlide: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired, // currently passing in height dynamically, but this could also be done in css if it will never change
  onSlideChange: PropTypes.func.isRequired,
  priorSlide: PropTypes.number.isRequired,
};

// --------------------------------------------------------------------------
// ------------------------------------- demo/src/demo-carousel.jsx
// --------------------------------------------------------------------------
class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
      priorSlide: 0,
    };
    this.setSlide = this.setSlide.bind(this);
  }
  setSlide(currentSlide, priorSlide) {
    this.setState({ currentSlide, priorSlide });
  }
  render() {
    return (
      <StatelessCarousel currentSlide={this.state.currentSlide} priorSlide={this.state.priorSlide} onSlideChange={this.setSlide} height={400}>
        {this.props.children}
      </StatelessCarousel>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Carousel;
