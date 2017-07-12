import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '../util/state-manager';
import sidebarModel from './sidebar-model';


const Sidebar = ({ state, close }) => (
  <div className={`sidebar c-sidebar bg-white shadow--gray ${state.isOpen ? 'sidebar--open' : ''}`}>
    <a className='c-sidebar--close icon-circle icon-x-navy icon--xsmall' onClick={() => close()} />
    <div><state.Contents /></div>
  </div>
);

Sidebar.propTypes = {
  state: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    Contents: PropTypes.func.isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
  // all the other methods (open, toggle) are available as props too
};


// could also have done:
// @connect(sidebarModel)
// class Sidebar extends Component { ... }
// or...
// connect(sidebarModel)(Sidebar);
// or...
export default connect(sidebarModel, Sidebar);
