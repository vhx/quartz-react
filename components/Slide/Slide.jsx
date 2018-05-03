import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAspectRatioHeight } from '../util';

class Slide extends Component {
  constructor() {
    super();
    this.getImgHeight = this.getImgHeight.bind(this);
  }

  getImgHeight() {
    const { isWide } = this.props;
    const { isMobile, height, width } = this.props.dynamicProps;
    if (isWide) {
      if (isMobile) { return getAspectRatioHeight('16:9', width); }
      const isNarrow = getAspectRatioHeight('16:6', width) < height;
      return isNarrow ? height : getAspectRatioHeight('16:6', width);
    }
    if (isMobile) { return getAspectRatioHeight('16:9', width); }
    return height;
  }

  render() {
    const { animationDuration, enter, enterDirection, exitDirection, isMobile, zIndex } = this.props.dynamicProps;
    const { children, img, mobileImg, isWide } = this.props;
    const display = zIndex === '-1' ? 'none' : 'block';
    return (
      <div className={`slide ${exitDirection} ${enter ? `ENTER_${enterDirection}` : ''}`} style={{ animationDuration: `${animationDuration}ms`, display, zIndex }}>
        <div className={isMobile ? 'slide-bg slide-bg--mobile' : 'slide-bg' }>
          <div className={isWide ? 'slide-layout-wide' : 'slide-layout-container'}>
            <img className='slide-bg-img' src={isMobile ? mobileImg : img} alt='Slide' style={{ height: `${this.getImgHeight()}px` }} />
          </div>
        </div>
        <div className='slide-layout-container'>
          <div className={isMobile ? 'slide-content slide-content--mobile' : 'slide-content'}>
            { children }
          </div>
        </div>
      </div>
    );
  }
}

Slide.propTypes = {
  dynamicProps: PropTypes.shape({
    animationDuration: PropTypes.number.isRequired,
    enter: PropTypes.bool.isRequired,
    enterDirection: PropTypes.oneOf([ 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
    exitDirection: PropTypes.oneOf([ '', 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
    isMobile: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    zIndex: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  img: PropTypes.string.isRequired,
  mobileImg: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
};

Slide.defaultProps = {
  isWide: false,
};

export default Slide;
