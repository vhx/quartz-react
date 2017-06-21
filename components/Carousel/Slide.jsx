import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


function getClass({ isActive, isReady }) {
  return classNames({
    slide: true,
    isActive,
    isReady,
  });
}

const Slide = ({ backgroundUrl, description, isActive, isReady, title }) => (
  <div className={getClass({ isActive, isReady })}>
    <div className='slide-background'><img src={backgroundUrl} alt={title} /></div>
    <div className='slide-gradient' />
    <div className='slide-title'>{title}</div>
    <div className='slide-body'>
      <p>{description}</p>
    </div>
  </div>
);

Slide.propTypes = {
  backgroundUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Slide;
