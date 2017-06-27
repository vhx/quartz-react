import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { If } from '../util';

const MIN_HEIGHT = 368;

// given `aspectRatio` of "16:9" and width 1280
// => 720
function getAspectRatioHeightFromWidth(aspectRatio, width) {
  const [ w, h ] = aspectRatio.split(':').map(str => parseInt(str, 10));
  const height = width / (w / h);
  return Math.floor(height); // round down to prevent possible single pixel black line
}

// next(3, 0) => 1
// next(3, 1) => 2
// next(3, 2) => 0 // <- it wraps around to the first slide
function next(length, current) {
  return (current + 1) % length;
}

// prev(3, 2) => 1
// prev(3, 1) => 0
// prev(3, 0) => 2 // <- it wraps around to the last slide
function prev(length, current) {
  return (current - 1) < 0 ? (length - 1) : (current - 1);
}


class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
      priorSlide: 0,
      isGoingNext: false,
      isGoingPrev: false,
    };
    this.el = null;
    this.setProportionalHeight = this.setProportionalHeight.bind(this);
    this.generateCoin = this.generateCoin.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
  }

  componentDidMount() {
    this.setProportionalHeight();
    window.addEventListener('resize', this.setProportionalHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setProportionalHeight);
  }

  setProportionalHeight() {
    if (this.el) {
      const width = this.el.clientWidth;
      const height = getAspectRatioHeightFromWidth(this.props.aspectRatio, width);
      const heightWithinConstraints = Math.max(MIN_HEIGHT, height);
      this.el.style.height = `${heightWithinConstraints}px`;
    }
  }

  generateCoin(Slide, i) {
    const isCurrent = this.state.currentSlide === i;
    return (
      <button
        key={i}
        disabled={isCurrent}
        className={isCurrent ? 'coin active' : 'coin'}
        onClick={() => this.goToSlide(i) }
      />
    );
  }

  goNext() {
    this.goToSlide(next(this.props.slides.length, this.state.currentSlide));
  }

  goPrev() {
    this.goToSlide(prev(this.props.slides.length, this.state.currentSlide));
  }

  goToSlide(n) {
    this.setState({
      currentSlide: n,
      priorSlide: this.state.currentSlide,
      isGoingNext: n > this.state.currentSlide,
      isGoingPrev: n < this.state.currentSlide,
    });
  }

  render() {
    const { currentSlide, isGoingNext, isGoingPrev, priorSlide } = this.state;
    const { slides } = this.props;
    return (
      <div className='carousel' ref={(el) => { this.el = el; }}>
        <div>{ slides.map((Slide, i) => <Slide key={i} isActive={i === currentSlide} isExitingLeft={i === priorSlide && isGoingPrev} isExitingRight={i === priorSlide && isGoingNext} currentSlide={currentSlide} />) }</div>
        <If condition={slides.length > 1}>
          <div className='coins'>{ slides.map(this.generateCoin) }</div>
          <button onClick={this.goPrev} className='carousel-arrow carousel-arrow--left'><Icon name='angle-left' color='white' size='small' /></button>
          <button onClick={this.goNext} className='carousel-arrow carousel-arrow--right'><Icon name='angle-right' color='white' size='small' /></button>
        </If>
      </div>
    );
  }
}

function aspectRatioPropType(props) {
  if (typeof props.aspectRatio !== 'string') {
    throw new Error('Aspect ratio must be a string of the form: "16:9"');
  }
  const [ width, height ] = props.aspectRatio.split(':').map(str => parseInt(str, 10));
  if (isNaN(width) || isNaN(height)) {
    throw new Error('Invalid aspect ratio. Must be a string of the form: "16:9"');
  }
}

Carousel.propTypes = {
  aspectRatio: aspectRatioPropType,
  slides: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
};

Carousel.defaultProps = {
  aspectRatio: '16:6',
};

export default Carousel;
