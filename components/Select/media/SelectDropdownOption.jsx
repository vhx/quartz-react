import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import { If, truncate } from '../../util';

const imgStyle = url => ({
  backgroundImage: `url(${url})`,
  height: '40px',
  width: '70px',
});

function getButton(isProcessing, isSelected) {
  if (isProcessing) {
    return <div className='c-item-toggle loader-white loader--small' />;
  }
  if (isSelected) {
    return <Icon size='xsmall' name='check' color='navy' className='block c-item-toggle border is-selected' button />;
  }
  return <Icon size='xsmall' name='plus-thin' color='white' className='block c-item-toggle border' button />;
}

const MediaSelectDropdownOption = ({ description, imageUrl, isLoading, isProcessingItem, isSelected, label, maxLabelLength, multiSelect, onOptionToggle, uniqueId }) => (
  <li className={`c-media-item--container padding-horz-medium padding-vert-small clearfix ${isSelected ? 'is-selected' : ''}`} onClick={() => !isLoading && onOptionToggle(uniqueId)}>
    <div className='c-media-item--image-container left'>
      <div className='c-media-item--image radius margin-right-medium img' style={imgStyle(imageUrl)} />
    </div>
    <div className='c-media-item--image-content clearfix left'>
      <p className='text--navy line-medium truncate block'>{truncate(label, maxLabelLength)}</p>
      <p className='text--gray line-medium truncate block'>{description}</p>
    </div>
    <If condition={multiSelect}>
      <div className='c-media-item--action clearfix right'>
        { getButton(isProcessingItem, isSelected) }
      </div>
    </If>
  </li>
);

MediaSelectDropdownOption.propTypes = {
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isProcessingItem: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  maxLabelLength: PropTypes.number.isRequired,
  multiSelect: PropTypes.bool.isRequired,
  onOptionToggle: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

MediaSelectDropdownOption.defaultProps = {
  description: '',
  isProcessingItem: false,
};

export default MediaSelectDropdownOption;
