import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


function getClass({ isActive, isReady, isWide, wasActive }) {
  return classNames({
    slide: true,
    isActive,
    isReady,
    isWide,
    wasActive,
  });
}

const Slide = ({ backgroundUrl, description, isActive, isReady, isWide, title, wasActive }) => (
  <div className={getClass({ isActive, isReady, isWide, wasActive })}>
    <div className='slide-background'><img src={backgroundUrl} alt={title} style={{ height: '720px', width: isWide ? '1920px' : '1280px' }} /></div>
    <div className='slide-gradient' />
    <div className='slide-contents'>
      <div className='slide-title'>{title}</div>
      <div className='slide-body'>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

Slide.propTypes = {
  backgroundUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  isWide: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  wasActive: PropTypes.bool.isRequired,
};

export default Slide;
