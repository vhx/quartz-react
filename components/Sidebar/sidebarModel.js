import React from 'react';
import { Model } from '../util/model';

const EmptyComponent = () => <span />;

// this would go in its own file, so it could imported and used anywhere
export default Model({
  initialState: {
    isOpen: false,
    Contents: EmptyComponent,
  },
  methods: {
    close() {
      return { isOpen: false };
    },
    open(Contents) {
      return Contents ?
        { isOpen: true, Contents } :
        { isOpen: true };
    },
    toggle(Contents) {
      if (this.state.isOpen) {
        this.close();
      } else {
        this.open(Contents);
      }
    },
  },
});
