/* eslint-disable react/no-unused-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DefaultTrigger from './Trigger.jsx';
import { If } from '../util';

function getClass(props, type) {
  const { caretAlign, dropdownPosition, inline, search } = props;
  return classNames({
    inline,
    form: true,
    relative: true,
    'c-select--container': true,
    'has-search': Boolean(search),
    // 'has-trigger': Boolean(props.Trigger), // has-trigger does what custom offset could do more generally. Will implement this if not doing custom offset.
    'has-media': type === 'media',
    'caret--top-right':     dropdownPosition === 'below' && caretAlign === 'right',
    'caret--top-left':      dropdownPosition === 'below' && caretAlign === 'left',
    'caret--top-center':    dropdownPosition === 'below' && caretAlign === 'center',
    'caret--bottom-right':  dropdownPosition === 'above' && caretAlign === 'right',
    'caret--bottom-left':   dropdownPosition === 'above' && caretAlign === 'left',
    'caret--bottom-center': dropdownPosition === 'above' && caretAlign === 'center',
  });
}

export default function SelectHOC({ Dropdown, type }) {
  class Select extends Component {

    constructor(props) {
      super(props);
      this.element = null;
      this.handleGlobalClick = this.handleGlobalClick.bind(this);
    }

    componentWillMount() {
      document.addEventListener('click', this.handleGlobalClick);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleGlobalClick);
    }

    // If user clicks anywhere but the <Select>, then close it.
    handleGlobalClick(event) {
      if (!this.element) { return; }
      if (event.target !== this.element && !this.element.contains(event.target)) {
        this.props.onOpenToggle(false);
      }
    }

    render() {
      const Trigger = this.props.Trigger || DefaultTrigger;
      return (
        <div className={getClass(this.props, type)} ref={((el) => { this.element = el; })}>
          <Trigger {...this.props} />
          <If condition={this.props.isOpen}>
            <Dropdown {...this.props} />
          </If>
        </div>
      );
    }
  }

  Select.propTypes = {
    caretAlign: PropTypes.oneOf([ 'left', 'center', 'right' ]),
    color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]),
    dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]),
    inline: PropTypes.bool,
    isOpen: PropTypes.bool,
    maxLabelLength: PropTypes.number,
    multiSelect: PropTypes.bool,
    onOpenToggle: PropTypes.func.isRequired,
    onSelectionToggle: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      // NOTE: any additional keys are also allowed, so you can store as much data in the `option` as you would like
      label: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
      description: PropTypes.string,
    })).isRequired,
    selectedOptions: PropTypes.objectOf(PropTypes.bool).isRequired,
    search: PropTypes.func, // search(query) called onInput currently. Can debounce if made stateful, or leave that to parent.
    Trigger: PropTypes.func, // allow passing in a custom Trigger as prop, so it's not necessary to import the HOC
    triggerLabel: PropTypes.string,
    triggerPlaceholder: PropTypes.string,
  };

  Select.defaultProps = {
    caretAlign: 'right',
    color: 'gray',
    dropdownPosition: 'below',
    inline: false,
    isOpen: false,
    maxLabelLength: Infinity,
    multiSelect: false,
    search: null,
    Trigger: null,
    triggerLabel: '',
    triggerPlaceholder: 'Select an option', // TODO: verify that this is a sensible default label
  };

  return Select;
}
