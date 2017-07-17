import React from 'react';
import { Model } from '../util/model';

const EmptyComponent = () => <div />;

const modalModel = Model({
  initialState: {
    actions: [],
    body: <EmptyComponent />,
    isOpen: false,
    size: 'medium',
    title: '',
  },
  methods: {
    close() {
      return {
        actions: [],
        body: <EmptyComponent />,
        isOpen: false,
        size: 'medium',
        title: '',
      };
    },
    open({ actions, Children, size, title }) {
      return {
        actions,
        body: <Children />,
        isOpen: true,
        size,
        title,
      };
    },
  },
});

export default modalModel;
