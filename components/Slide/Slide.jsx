import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { If, getAspectRatioHeight, truncate } from '../util';

const MAX_TITLE_LENGTH = 50; // characters

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
    const { buttonClass, title, subtitle, description, img, mobileImg, trailer, isWide } = this.props;
    return (
      <div className={`slide ${exitDirection} ${enter ? `ENTER_${enterDirection}` : ''}`} style={{ zIndex, animationDuration: `${animationDuration}ms` }}>
        <div className={isMobile ? 'slide-bg slide-bg--mobile' : 'slide-bg' }>
          <div className={isWide ? 'slide-layout-wide' : 'slide-layout-container'}>
            <img className='slide-bg-img' src={isMobile ? mobileImg : img} alt={title} style={{ height: `${this.getImgHeight()}px` }} />
          </div>
        </div>
        <div className='slide-layout-container'>
          <div className={isMobile ? 'slide-content slide-content--mobile' : 'slide-content'}>
            <div className='slide-title'>{truncate(title, MAX_TITLE_LENGTH)}</div>
            <div className='slide-subtitle'>{subtitle}</div>
            <div className='slide-description'>{description}</div>
            <div className='slide-buttons'>
              <button className={`slide-button ${buttonClass}`}>
                <Icon name='play' color='white' size='xxsmall' />
                <span className='slide-button-text'>Watch now</span>
              </button>
              <If condition={Boolean(trailer)} inline>
                <button className='slide-button slide-button--alt'>
                  <Icon name='play' color='white' size='xxsmall' />
                  <span className='slide-button-text'>Trailer</span>
                </button>
              </If>
            </div>
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
  buttonClass: PropTypes.string,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  mobileImg: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
  title: PropTypes.string.isRequired,
  trailer: PropTypes.string, // probably a URL or id
  subtitle: PropTypes.string,
};

Slide.defaultProps = {
  buttonClass: 'slide-button--default',
  isWide: false,
  subtitle: '',
  trailer: null,
};

export default Slide;
