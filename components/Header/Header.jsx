import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import iconList from '../Icon/icon-list.js';

const Header = ({ border, children, Description, icon, title }) => (
  <div className={`header row padding-bottom-medium ${border ? 'border-bottom' : ''}`}>
    <div className='column small-16 medium-8 large-10'>
      <div className='media'>
        <div className='media-unit text-top'><Icon name={icon} size='large' /></div>
        <div className='media-unit media-fill padding-left-medium'>
          <h2 className='head-3'>{title}</h2>
          <div className='text text--gray'>{typeof Description === 'string' ? Description : <Description />}</div>
        </div>
      </div>
    </div>
    <div className='column small-16 medium-8 large-6 text-right'>{children}</div>
  </div>
);

Header.propTypes = {
  border: PropTypes.bool,
  children: PropTypes.node,
  Description: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]), // can be a string or component
  icon: PropTypes.oneOf(iconList).isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  border: true,
  children: null,
  Description: '',
};

Header.propDescriptions = {
  Description: 'Either a string or component',
  icon: 'String: One of any of the valid icon names',
};

export default Header;
