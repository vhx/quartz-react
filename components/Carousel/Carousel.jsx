import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { If } from '../util';
import Icon from '../Icon';
// import classNames from 'classnames';


// --------------------------------------------------------------------------
// ------------------------------------- slide.jsx
// --------------------------------------------------------------------------
const Slide = ({ active, children }) => (
  <div className={`slide ${active ? 'active' : ''}`}>
    <div className='slide-gradient' />
    <div>SLIDE CONTAINER</div>
    <div>{children}</div>
  </div>
);

Slide.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
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

const StatelessCarousel = ({ children, height, currentSlide, onSlideChange }) => {
  const hasMoreThanOneSlide = Array.isArray(children);
  const slideCount = hasMoreThanOneSlide ? children.length : 1;
  const gotoPrev = () => onSlideChange(prev(slideCount, currentSlide));
  const gotoNext = () => onSlideChange(next(slideCount, currentSlide));
  return (
    <div className='carousel' style={{ height: `${height}px` }}>
      <div>
        { React.Children.map(children, (slide, i) => <Slide active={currentSlide === i}>{slide}</Slide>) }
      </div>
      <If condition={hasMoreThanOneSlide}>
        <button className='carousel-arrow carousel-arrow--left' onClick={gotoPrev}><Icon name='angle-left' color='white' size='small' /></button>
        <button className='carousel-arrow carousel-arrow--right' onClick={gotoNext}><Icon name='angle-right' color='white' size='small' /></button>
        <div className='coins'>
          { React.Children.map(children, (slide, i) => <button onClick={() => onSlideChange(i)} disabled={currentSlide === i} className={currentSlide === i ? 'coin active' : 'coin'} />) }
        </div>
      </If>
    </div>
  );
};

StatelessCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  currentSlide: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onSlideChange: PropTypes.func.isRequired,
};

// --------------------------------------------------------------------------
// ------------------------------------- demo/src/demo-carousel.jsx
// --------------------------------------------------------------------------
class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
    };
    this.setSlide = this.setSlide.bind(this);
  }
  setSlide(currentSlide) {
    this.setState({ currentSlide });
  }
  render() {
    return (
      <StatelessCarousel currentSlide={this.state.currentSlide} onSlideChange={this.setSlide} height={400}>
        {this.props.children}
      </StatelessCarousel>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Carousel;
