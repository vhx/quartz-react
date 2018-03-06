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
            <Icon src='data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjMgMjMiPjxzdHlsZT4uc3Qwe2ZpbGw6IzAwYWRlZn0uc3Qxe2ZpbGw6IzFhMmUzYn08L3N0eWxlPjx0aXRsZT5pY29ucy1zaW5nbGV0b25zPC90aXRsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNi40IDYuMmw1LjEtMi45IDUuMSAyLjktNS4xIDMuMXoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTEuNS4yTDEuOSA1Ljd2MTEuNmw5LjYgNS41IDkuNi01LjVWNS43TDExLjUuMnptNy41IDZsLTcuNSA0LjVMNCA2LjJsNy41LTQuM0wxOSA2LjJ6TTMuMyA3LjRsNy41IDQuNXY4LjhsLTcuNS00LjN2LTl6bTguOSAxMy4zdi04LjhsNy41LTQuNXY5LjFsLTcuNSA0LjJ6Ii8+PC9zdmc+' size='large' />
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
