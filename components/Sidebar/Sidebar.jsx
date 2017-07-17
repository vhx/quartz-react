import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '../util/model';
import sidebarModel from './sidebarModel';

const Sidebar = ({ isOpen, Contents, close }) => (
  <div className={`sidebar c-sidebar bg-white shadow--gray ${isOpen ? 'sidebar--open' : ''}`}>
    <a className='c-sidebar--close icon-circle icon-x-navy icon--xsmall' onClick={() => close()} />
    <div><Contents /></div>
  </div>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  Contents: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  // all the other methods (open, toggle) are available as props too
};

export default connect(sidebarModel, Sidebar);
