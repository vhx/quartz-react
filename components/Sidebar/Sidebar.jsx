import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from '../util';
import sidebarModel from './sidebarModel.jsx';

import styles from './Sidebar.scss';



let sidebarsInitialized = 0;

class Sidebar extends Component {
  componentWillMount() {
    if (sidebarsInitialized !== 0) {
      throw Error('<Sidebar /> must be mounted only once');
    }
    sidebarsInitialized++;
  }
  componentWillUnmount() {
    sidebarsInitialized--;
  }
  render() {
    const { isOpen, Contents } = this.props;

    const sidebarClasses = isOpen => {
      return classNames({
        [styles.sidebarOpen]: !isOpen,
        [styles.sidebar]: isOpen,
      });
    }
    return (
      <div style={{ zIndex: 2147483800 }} className={sidebarClasses(isOpen)}>
        <span className={styles.closeIcon} style={{ cursor: 'pointer' }} onClick={() => sidebarModel.close()} />
        <div><Contents /></div>
      </div>
    );
  }
}


Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  Contents: PropTypes.func.isRequired,
};

export default connect(sidebarModel, Sidebar);
