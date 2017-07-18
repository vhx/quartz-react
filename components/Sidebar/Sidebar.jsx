import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '../util';
import sidebarModel from './sidebarModel.jsx';

const Sidebar = ({ isOpen, Contents }) => (
  <div className={`sidebar c-sidebar bg-white shadow--gray ${isOpen ? 'sidebar--open' : ''}`}>
    <a className='c-sidebar--close icon-circle icon-x-navy icon--xsmall' onClick={() => sidebarModel.close()} />
    <div><Contents /></div>
  </div>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  Contents: PropTypes.func.isRequired,
};

export default connect(sidebarModel, Sidebar);
