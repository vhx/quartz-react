import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from '../util';
import sidebarModel from './sidebarModel.jsx';

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
    return (
      <div className={`sidebar c-sidebar bg-white shadow--gray ${isOpen ? 'sidebar--open' : ''}`}>
        <span className='c-sidebar--close icon-circle icon-x-navy icon--xsmall' style={{ cursor: 'pointer' }} onClick={() => sidebarModel.close()} />
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
