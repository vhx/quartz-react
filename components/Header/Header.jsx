import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';
import iconList from '../Icon/icon-list.js';

import styles from './Header.scss';

const containerClasses = border => {
  return cx({
    [styles.headerContainer]: border === false || border === undefined,
    [styles.headerContainerBorder]: border === true,
  });
};

const Header = ({ border, children, Description, icon, title }) => {
  return (
    <div className={containerClasses(border)}>
      <div className={styles.mediaColumnWrapper}>
        <div className={styles.media}>
          <div className={styles.mediaIconUnit}>
            <Icon name={icon} size='large' />
          </div>
          <div className={styles.mediaTextUnit}>
            <h2 className={styles.headerTitle}>{title}</h2>
            <div className={styles.headerDescription}>{typeof Description === 'string' ? Description : <Description />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerColumnOptionsWrapper}>{children}</div>
    </div>
  );
}

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
