import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { If, getAspectRatioHeight, noop } from '../util';
import { KEY_CODES } from '../util/constants';


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

function containValue(max, min, value) {
  if (value > max) { return max; }
  if (value < min) { return min; }
  return value;
}

function getZIndex(topSlideIndex, bgSlideIndex, currentIndex) {
  if (currentIndex === topSlideIndex) return '1';
  if (currentIndex === bgSlideIndex) return '0';
  return '-1';
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgSlideIndex: 1,
      topSlideIndex: 0,
      enterDirection: 'TO_LEFT',
      exitDirection: '',
      isFresh: true, // `isFresh` just means no slide change has been triggered yet. it's a hack used to allow a custom `enter` value on the first bgSlide. would like to find a better alternative to this...
      isAnimating: false,
      isMobile: false, // passed down to <Slide>
      height: 0, // passed down to <Slide> so it can reuse the h/w calculations
      width: 0, // passed down to <Slide> so it can reuse the h/w calculations
    };
    this.el = null;
    this.timerID = null;
    this.setProportionalHeight = this.setProportionalHeight.bind(this);
    this.keyboardNavigate = this.keyboardNavigate.bind(this);
    this.generateCoin = this.generateCoin.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.clearAutoplay = this.clearAutoplay.bind(this);
    this.startAutoplay = this.startAutoplay.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.prevClick = this.prevClick.bind(this);
  }

  componentDidMount() {
    this.setProportionalHeight();
    window.addEventListener('resize', this.setProportionalHeight);
    // NOTE: if keyboard navigation ends up being an issue because of <input> elements on the page,
    // maybe bind the event to `this.el` instead of `window`.
    window.addEventListener('keyup', this.keyboardNavigate);
    this.startAutoplay();
  }

  componentDidUpdate(previousProps) {
    if (this.props.slides.length !== previousProps.slides.length && this.props.slides.length > 1) {
      this.startAutoplay();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setProportionalHeight);
    window.removeEventListener('keyup', this.keyboardNavigate);
    this.clearAutoplay();
  }

  setProportionalHeight() {
    if (this.el) {
      const MOBILE_PADDING_BOTTOM = 0;
      const { aspectRatio, maxHeight, minHeight } = this.props;
      const width = this.el.clientWidth !== 0 ? this.el.clientWidth : document.body.clientWidth;
      const aspectHeight = getAspectRatioHeight(aspectRatio, width);
      const height = containValue(maxHeight, minHeight, aspectHeight);
      const isMobile = height > getAspectRatioHeight('16:9', width);
      this.setState({ height, isMobile, width });
      this.el.style.height = `${height + (isMobile ? MOBILE_PADDING_BOTTOM : 0)}px`;
    }
  }

  startAutoplay() {
    if (this.props.auto) {
      this.timerID = setInterval(
        () => this.next(), 8000);
    }
  }

  clearAutoplay() {
    if (this.props.auto) {
      clearInterval(this.timerID);
    }
  }

  keyboardNavigate(event) {
    if (this.state.isAnimating || this.props.slides.length <= 1) { return; }
    const key = event.keyCode || event.which;
    if (key === KEY_CODES.LEFT) { this.prevClick(); }
    if (key === KEY_CODES.RIGHT) { this.nextClick(); }
  }

  goToSlide(i, overrideDirection = '', eventType) {
    const direction = i > this.state.topSlideIndex ? (overrideDirection || 'TO_LEFT') : (overrideDirection || 'TO_RIGHT');
    this.setState({
      bgSlideIndex: i,
      enterDirection: direction,
      exitDirection: direction,
      isAnimating: true,
      isFresh: false,
    });

    setTimeout(() => {
      this.setState({
        bgSlideIndex: i, // This is very odd. bgSlideIndex *should* be assumed to be the result of calcNext(). In some cases, that leads to wrong animations. But for some reason this works.
        enterDirection: this.state.exitDirection,
        exitDirection: '',
        isAnimating: false,
        topSlideIndex: this.state.bgSlideIndex, // === i
      });
    }, this.props.animationDuration);

    this.props.onSlideChange({ slideIndex: i, eventType });
  }

  next() {
    this.clearAutoplay();
    const nextSlide = calcNext(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(nextSlide, 'TO_LEFT', 'carousel_next');
    this.startAutoplay();
  }

  prev() {
    this.clearAutoplay();
    const prevSlide = calcPrev(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(prevSlide, 'TO_RIGHT', 'carousel_prev');
    this.startAutoplay();
  }

  nextClick() {
    this.clearAutoplay();
    const nextSlide = calcNext(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(nextSlide, 'TO_LEFT', 'carousel_next');
  }

  prevClick() {
    this.clearAutoplay();
    const prevSlide = calcPrev(this.props.slides.length, this.state.topSlideIndex);
    this.goToSlide(prevSlide, 'TO_RIGHT', 'carousel_prev');
  }

  generateCoin(Slide, i) {
    const { isAnimating, bgSlideIndex, topSlideIndex } = this.state;
    const isCurrent = isAnimating ? bgSlideIndex === i : topSlideIndex === i;
    return (
      <button
        key={i}
        className={isCurrent ? 'coin active' : 'coin'}
        disabled={isCurrent || isAnimating}
        onClick={() => this.goToSlide(i, '', 'carousel_coin') }
      />
    );
  }

  render() {
    const { topSlideIndex, bgSlideIndex, enterDirection, exitDirection, isAnimating, isFresh, isMobile, height, width } = this.state;
    const { animationDuration, slides } = this.props;
    return (
      <div
        className={`carousel ${isMobile ? 'carousel--mobile' : ''}`}
        ref={(el) => { this.el = el; }}
        onMouseEnter={() => this.clearAutoplay()}
        onMouseLeave={() => this.startAutoplay()}
      >
        <div className='carousel-slides'>
          {
            slides.map(({ Slide, id }, i) => (
              <Slide
                key={id}
                animationDuration={animationDuration}
                enter={(bgSlideIndex === i || topSlideIndex === i) && !(isFresh && i === 1)}
                enterDirection={enterDirection}
                exitDirection={topSlideIndex === i ? exitDirection : ''}
                height={height}
                isMobile={isMobile}
                width={width}
                zIndex={getZIndex(topSlideIndex, bgSlideIndex, i)}
              />
            ))
          }
        </div>
        <If condition={slides.length > 1}>
          <div className='carousel-layout-container' style={{ height: `${height}px` }}>
            <div className='coins'>{ slides.map(this.generateCoin) }</div>
            <button disabled={isAnimating} onClick={this.prevClick} className='carousel-arrow carousel-arrow--left'><Icon name='angle-left' color='white' size={isMobile ? 'xsmall' : 'small' } /></button>
            <button disabled={isAnimating} onClick={this.nextClick} className='carousel-arrow carousel-arrow--right'><Icon name='angle-right' color='white' size={isMobile ? 'xsmall' : 'small' } /></button>
          </div>
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

aspectRatioPropType.isRequired = false;

Carousel.propTypes = {
  animationDuration: PropTypes.number,
  aspectRatio: aspectRatioPropType,
  maxHeight: PropTypes.number,
  minHeight: PropTypes.number,
  onSlideChange: PropTypes.func,
  slides: PropTypes.arrayOf(PropTypes.shape({
    Slide: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  auto: PropTypes.bool,
};

Carousel.defaultProps = {
  animationDuration: 600, // ms
  aspectRatio: '16:6',
  maxHeight: 640, // px
  minHeight: 368, // px
  onSlideChange: noop,
  auto: false,
};

Carousel.propDescriptions = {
  animationDuration: 'Milliseconds',
  aspectRatio: 'String of two integers separated by ":"',
  slides: 'Array of objects: { Slide: Component, id: String }',
};

export default Carousel;
