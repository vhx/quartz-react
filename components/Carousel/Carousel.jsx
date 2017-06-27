import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { If } from '../util';

const MIN_HEIGHT = 368; // px
const MAX_HEIGHT = 600; // px
const ANIMATION_DURATION = 600; // ms

// given `aspectRatio` of "16:9" and width 1280
// => 720
function getAspectRatioHeightFromWidth(aspectRatio, width) {
  const [ w, h ] = aspectRatio.split(':').map(str => parseInt(str, 10));
  const height = width / (w / h);
  return Math.floor(height); // round down to prevent possible single pixel black line
}

// calcNext(3, 0) => 1
// calcNext(3, 1) => 2
// calcNext(3, 2) => 0 // <- it wraps around to the first slide
function calcNext(length, current) {
  return (current + 1) % length;
}

// calcPrev(3, 2) => 1
// calcPrev(3, 1) => 0
// calcPrev(3, 0) => 2 // <- it wraps around to the last slide
function calcPrev(length, current) {
  return (current - 1) < 0 ? (length - 1) : (current - 1);
}

function containHeight(height) {
  const atLeastMinHeight = Math.max(MIN_HEIGHT, height);
  return Math.min(MAX_HEIGHT, atLeastMinHeight);
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgSlideIndex: 1,
      enterDirection: 'TO_LEFT',
      exitDirection: '',
      isFresh: true, // `isFresh` just means no slide change has been triggered yet. it's a hack used to allow a custom `enter` value on the first bgSlide. would like to find a better alternative to this...
      topSlideIndex: 0,
    };
    this.el = null;
    this.setProportionalHeight = this.setProportionalHeight.bind(this);
    this.generateCoin = this.generateCoin.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
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
      this.el.style.height = `${containHeight(height)}px`;
    }
  }

  goToSlide(i, overrideDirection = '') {
    const direction = i > this.state.topSlideIndex ? (overrideDirection || 'TO_LEFT') : (overrideDirection || 'TO_RIGHT');
    this.setState({
      bgSlideIndex: i,
      enterDirection: direction,
      exitDirection: direction,
      isFresh: false,
    });

    setTimeout(() => {
      this.setState({
        bgSlideIndex: i,
        enterDirection: this.state.exitDirection,
        exitDirection: '',
        topSlideIndex: this.state.bgSlideIndex,
      });
    }, ANIMATION_DURATION);
  }

  next() {
    const nextSlide = calcNext(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(nextSlide, 'TO_LEFT');
  }

  prev() {
    const prevSlide = calcPrev(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(prevSlide, 'TO_RIGHT');
  }

  generateCoin(Slide, i) {
    const isAnimating = this.state.exitDirection !== '';
    const isCurrent = isAnimating ? this.state.bgSlideIndex === i : this.state.topSlideIndex === i;
    return (
      <button
        key={i}
        className={isCurrent ? 'coin active' : 'coin'}
        disabled={isCurrent || isAnimating}
        onClick={() => this.goToSlide(i) }
      />
    );
  }

  render() {
    const { topSlideIndex, bgSlideIndex, enterDirection, exitDirection, isFresh } = this.state;
    const { slides } = this.props;
    const isAnimating = exitDirection !== '';
    return (
      <div className='carousel' ref={(el) => { this.el = el; }}>
        <div>
          <div>
            {
              // <TopSlide animationDuration={ANIMATION_DURATION} exitDirection={exitDirection} zIndex='1' />
              // <BgSlide animationDuration={ANIMATION_DURATION} zIndex='0' />
              slides.map(({ Slide, id }, i) => (
                <Slide
                  key={id}
                  animationDuration={ANIMATION_DURATION}
                  enter={(bgSlideIndex === i || topSlideIndex === i) && !(isFresh && i === 1)}
                  enterDirection={enterDirection}
                  exitDirection={topSlideIndex === i ? exitDirection : ''}
                  zIndex={topSlideIndex === i ? '1' : bgSlideIndex === i ? '0' : '-1'}
                />
              ))
            }
          </div>
        </div>
        <If condition={slides.length > 1}>
          <div className='coins'>{ slides.map(this.generateCoin) }</div>
          <button disabled={isAnimating} onClick={this.prev} className='carousel-arrow carousel-arrow--left'><Icon name='angle-left' color='white' size='small' /></button>
          <button disabled={isAnimating} onClick={this.next} className='carousel-arrow carousel-arrow--right'><Icon name='angle-right' color='white' size='small' /></button>
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
  slides: PropTypes.arrayOf(PropTypes.shape({
    Slide: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

Carousel.defaultProps = {
  aspectRatio: '16:6',
};

export default Carousel;
