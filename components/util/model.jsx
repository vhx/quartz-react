import React from 'react';
import { immutableMerge } from './index.js';

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
      if (updates && typeof updates === 'object') {
        model.state = immutableMerge(model.state, updates);
        notifyListeners(model.state);
      }
      // could also check here to see if fn returns a promise and then wait
      // until it resolves to merge and notifyListeners. that would make
      // async methods really nice to work with.
      // ...should this return  something? maybe return `updates`?
    };
  });

  return model;
}

export function connect(model, Component) {
  function connectComponent(Component) { // eslint-disable-line no-shadow
    return class ConnectedComponent extends React.PureComponent {
      constructor() {
        super();
        this.currentState = model.state;
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
      update(nextState) {
        this.currentState = nextState;
        this.forceUpdate();
      }
      render() {
        return <Component {...model.state} />;
      }
    };
  }

  if (!Component) return connectComponent; // this curries the function so you can also use it as a decorator
  return connectComponent(Component);
}
