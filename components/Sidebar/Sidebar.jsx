import React, { Component } from 'react';
import PropTypes from 'prop-types';

const sidebarModel = {
  state: Object.freeze({
    isOpen: false,
    children: null,
  }),
  listeners: [],
  close() {
    sidebarModel.state = Object.assign({}, sidebarModel.state, { isOpen: false });
    sidebarModel.notifyListeners();
  },
  open(Children) {
    sidebarModel.state = Object.assign({}, sidebarModel.state, {
      isOpen: true,
      children: <Children />,
    });
    sidebarModel.notifyListeners();
  },
  toggle(Children) {
    if (sidebarModel.state.isOpen) {
      sidebarModel.close();
    } else {
      sidebarModel.open(Children);
    }
  },
  subscribe(fn) {
    if (sidebarModel.listeners.indexOf(fn) === -1) {
      sidebarModel.listeners.push(fn);
    }
  },
  unsubscribe(fn) {
    const index = sidebarModel.listeners.indexOf(fn);
    if (index === -1) { return; }
    sidebarModel.listeners.splice(index, 1);
  },
  notifyListeners() {
    sidebarModel.listeners.forEach(fn => fn(sidebarModel.state));
  },
};


let sidebarIsInitialized = false;
class Sidebar extends Component {
  constructor() {
    super();
    this.state = sidebarModel.state;
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    if (sidebarIsInitialized) {
      console.warn('Sidebar has already been instanciated. There should only be one sidebar component mounted at any given time.');
    }
    sidebarIsInitialized = true;
    sidebarModel.subscribe(this.update);
  }

  componentWillUnmount() {
    sidebarIsInitialized = false;
    sidebarModel.unsubscribe(this.update);
  }

  update(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className={`sidebar c-sidebar bg-white shadow--gray ${this.state.isOpen ? 'sidebar--open' : ''}`}>
        <a className='c-sidebar--close icon-circle icon-x-navy icon--xsmall' onClick={() => sidebarModel.close()} />
        <div>{this.state.children}</div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
};

Sidebar.defaultProps = {
  isOpen: false,
};

Sidebar.close = sidebarModel.close;
Sidebar.open = sidebarModel.open;
Sidebar.toggle = sidebarModel.toggle;

export default Sidebar;
