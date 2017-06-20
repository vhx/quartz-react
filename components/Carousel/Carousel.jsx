import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { If } from '../util';
// import classNames from 'classnames';

// TODO: put this in an actual stylesheet
const css = {
  carousel: {
    background: '#000',
    color: '#fff',
  },

};

// --------------------------------------------------------------------------
// ------------------------------------- slide.jsx
// --------------------------------------------------------------------------
const Slide = ({ children }) => <div>SLIDE CONTAINER {children}</div>;


// --------------------------------------------------------------------------
// ------------------------------------- carousel.jsx
// --------------------------------------------------------------------------

function next(length, count) {
  return (count + 1) % length;
}

function prev(length, count) {
  return (count - 1) < 0 ? (length - 1) : (count - 1);
}

const StatelessCarousel = ({ children, currentSlide, onSlideChange }) => {
  const hasMoreThanOneSlide = Array.isArray(children);
  const slideCount = hasMoreThanOneSlide ? children.length : 1;
  return (
    <div style={css.carousel}>
      <If condition={hasMoreThanOneSlide}>
        <button onClick={() => onSlideChange(prev(slideCount, currentSlide))}>Prev</button>
        <button onClick={() => onSlideChange(next(slideCount, currentSlide))}>Next</button>
        <div>Current slide: {currentSlide}</div>
      </If>
      <div>
        { React.Children.map(children, slide => <Slide>{slide}</Slide>) }
      </div>
      <div>
        <If condition={hasMoreThanOneSlide}>
          { React.Children.map(children, (slide, i) => <button onClick={() => onSlideChange(i)} disabled={currentSlide === i}>{i}</button>) }
        </If>
      </div>
    </div>
  );
};

StatelessCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  currentSlide: PropTypes.number.isRequired,
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
      <StatelessCarousel currentSlide={this.state.currentSlide} onSlideChange={this.setSlide}>
        {this.props.children}
      </StatelessCarousel>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Carousel;
