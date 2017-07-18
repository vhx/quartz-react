import React from 'react';
import { immutableMerge } from './index.js';

const toStr = Object.prototype.toString;

export function Model({ initialState, methods }) {
  const listeners = [];
  const notifyListeners = nextState => listeners.forEach(fn => fn(nextState));

  const model = {
    state: Object.freeze(initialState),
    subscribe: fn => listeners.push(fn),
    unsubscribe: fn => listeners.splice(listeners.indexOf(fn), 1),
  };

  Object.keys(methods).forEach((method) => {
    model[method] = (...args) => {
      const updates = methods[method].apply(model, args);
      if (updates && toStr.call(updates) === '[object Object]') {
        model.state = immutableMerge(model.state, updates);
        notifyListeners(model.state);
      }
    };
  });

  return model;
}

export function connect(model, Component) {
  function connectComponent(Component) { // eslint-disable-line no-shadow
    return class ConnectedComponent extends React.PureComponent {
      constructor() {
        super();
        this.update = this.update.bind(this);
      }
      componentWillMount() {
        model.subscribe(this.update);
      }
      componentWillUnmount() {
        model.unsubscribe(this.update);
      }
      shouldComponentUpdate() {
        return false;
      }
      update() {
        this.forceUpdate();
      }
      render() {
        return React.createElement(Component, model.state);
      }
    };
  }

  if (!Component) return connectComponent; // this curries the function so you can also use it as a decorator
  return connectComponent(Component);
}
