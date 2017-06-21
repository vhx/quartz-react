import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


function getClass({ isActive, isReady, wasActive }) {
  return classNames({
    slide: true,
    isActive,
    isReady,
    wasActive,
  });
}

const Slide = ({ backgroundUrl, description, isActive, isReady, title, wasActive }) => (
  <div className={getClass({ isActive, isReady, wasActive })}>
    <div className='slide-background' style={{ height: '720px', width: '1280px' }}><img src={backgroundUrl} alt={title} /></div>
    <div className='slide-fixed-gradient' />
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
  title: PropTypes.string.isRequired,
  wasActive: PropTypes.bool.isRequired,
};

export default Slide;
