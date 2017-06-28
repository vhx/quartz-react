import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { If, getAspectRatioHeight } from '../util';


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


class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgSlideIndex: 1,
      enterDirection: 'TO_LEFT',
      exitDirection: '',
      isFresh: true, // `isFresh` just means no slide change has been triggered yet. it's a hack used to allow a custom `enter` value on the first bgSlide. would like to find a better alternative to this...
      topSlideIndex: 0,
      isMobile: false, // passed down to <Slide>
      height: 0, // passed down to <Slide> so it can reuse the h/w calculations
      width: 0, // passed down to <Slide> so it can reuse the h/w calculations
    };
    this.el = null;
    this.setProportionalHeight = this.setProportionalHeight.bind(this);
    this.keyboardNavigate = this.keyboardNavigate.bind(this);
    this.generateCoin = this.generateCoin.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount() {
    this.setProportionalHeight();
    window.addEventListener('resize', this.setProportionalHeight);
    // NOTE: if keyboard navigation ends up being an issue because of <input> elements on the page,
    // maybe bind the event to `this.el` instead of `window`.
    window.addEventListener('keyup', this.keyboardNavigate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setProportionalHeight);
    window.removeEventListener('keyup', this.keyboardNavigate);
  }

  setProportionalHeight() {
    if (this.el) {
      const MOBILE_PADDING_BOTTOM = 0;
      const { maxHeight, minHeight } = this.props;
      const width = this.el.clientWidth;
      const aspectHeight = getAspectRatioHeight(this.props.aspectRatio, width);
      const height = containValue(maxHeight, minHeight, aspectHeight);
      const isMobile = height > getAspectRatioHeight('16:9', width);
      this.setState({ height, isMobile, width });
      this.el.style.height = `${height + (isMobile ? MOBILE_PADDING_BOTTOM : 0)}px`;
    }
  }

  keyboardNavigate(event) {
    const isAnimating = this.state.exitDirection !== '';
    if (isAnimating || this.props.slides.length <= 1) { return; }
    const [ LEFT, RIGHT ] = [ 37, 39 ];
    const key = event.keyCode || event.which;
    if (key === LEFT) { this.prev(); }
    if (key === RIGHT) { this.next(); }
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
        bgSlideIndex: i, // This is very odd. bgSlideIndex *should* be assumed to be the result of calcNext(). In some cases, that leads to wrong animations. But for some reason this works.
        enterDirection: this.state.exitDirection,
        exitDirection: '',
        topSlideIndex: this.state.bgSlideIndex, // === i
      });
    }, this.props.animationDuration);
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
    const { topSlideIndex, bgSlideIndex, enterDirection, exitDirection, isFresh, isMobile, height, width } = this.state;
    const { animationDuration, slides } = this.props;
    const isAnimating = exitDirection !== '';
    return (
      <div className={`carousel ${isMobile ? 'carousel--mobile' : ''}`} ref={(el) => { this.el = el; }}>
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
                zIndex={topSlideIndex === i ? '1' : bgSlideIndex === i ? '0' : '-1'}
              />
            ))
          }
        </div>
        <If condition={slides.length > 1}>
          <div className='coins'>{ slides.map(this.generateCoin) }</div>
          <button disabled={isAnimating} onClick={this.prev} className='carousel-arrow carousel-arrow--left'><Icon name='angle-left' color='white' size={isMobile ? 'xsmall' : 'small' } /></button>
          <button disabled={isAnimating} onClick={this.next} className='carousel-arrow carousel-arrow--right'><Icon name='angle-right' color='white' size={isMobile ? 'xsmall' : 'small' } /></button>
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
  animationDuration: PropTypes.number,
  aspectRatio: aspectRatioPropType,
  maxHeight: PropTypes.number,
  minHeight: PropTypes.number,
  slides: PropTypes.arrayOf(PropTypes.shape({
    Slide: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

Carousel.defaultProps = {
  animationDuration: 600, // ms
  aspectRatio: '16:6',
  maxHeight: 640, // px
  minHeight: 368, //px
};

export default Carousel;
