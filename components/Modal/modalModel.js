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
      return { isOpen: false };
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
