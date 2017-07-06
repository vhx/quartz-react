import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import { If } from '../../util';

// TODO: this is a hack, we should have this in css if possible to make a PR to Quartz css
// (This fixes wrapping issues in `inline` select dropdowns)
const listStyle = { whiteSpace: 'nowrap' };

const SelectDropdownOption = ({ description, isLoading, isSelected, label, onOptionToggle, uniqueId }) => (
  <li className={`c-select--option padding-horz-medium ${isSelected ? 'is-selected' : ''}`} onClick={() => !isLoading && onOptionToggle(uniqueId)} style={listStyle}>
    <If condition={isSelected}>
      <Icon name='check' color='navy' size='xsmall' className='right margin-top-xsmall margin-left-small' />
    </If>
    <span className='c-select--item-label text--navy'>{label}</span>
    <span className='right text--gray'>{description}</span>
  </li>
);

SelectDropdownOption.propTypes = {
  description: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onOptionToggle: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

SelectDropdownOption.defaultProps = {
  description: '',
};

export default SelectDropdownOption;
