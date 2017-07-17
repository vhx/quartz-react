import React from 'react';
import { immutableMerge } from '../util';

const EmptyComponent = () => <div />;

const modalModel = {
  state: Object.freeze({
    actions: [],
    body: <EmptyComponent />,
    isOpen: false,
    size: 'medium',
    title: '',
  }),
  listeners: [],
  close() {
    modalModel.state = immutableMerge(modalModel.state, { isOpen: false });
    modalModel.notifyListeners();
  },
  open({ actions, Children, size, title }) {
    modalModel.state = immutableMerge(modalModel.state, {
      actions,
      body: <Children />,
      isOpen: true,
      size,
      title,
    });
    modalModel.notifyListeners();
  },
  subscribe(fn) {
    if (modalModel.listeners.indexOf(fn) === -1) {
      modalModel.listeners.push(fn);
    }
  },
  unsubscribe(fn) {
    const index = modalModel.listeners.indexOf(fn);
    if (index === -1) { return; }
    modalModel.listeners.splice(index, 1);
  },
  notifyListeners() {
    modalModel.listeners.forEach(fn => fn(modalModel.state));
  },
};

export default modalModel;
