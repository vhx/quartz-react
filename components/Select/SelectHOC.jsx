/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function getClass(props, type) {
  const { caretAlign, dropdownPosition, inline, search } = props;
  return classNames({
    inline,
    form: true,
    relative: true,
    'c-select--container': true,
    'has-search': Boolean(search),
    // 'has-trigger': props.hasTrigger,
    'has-media': type === 'media',
    'caret--top-right':     dropdownPosition === 'below' && caretAlign === 'right',
    'caret--top-left':      dropdownPosition === 'below' && caretAlign === 'left',
    'caret--top-center':    dropdownPosition === 'below' && caretAlign === 'center',
    'caret--bottom-right':  dropdownPosition === 'above' && caretAlign === 'right',
    'caret--bottom-left':   dropdownPosition === 'above' && caretAlign === 'left',
    'caret--bottom-center': dropdownPosition === 'above' && caretAlign === 'center',
  });
}

// TODO: use uniqueIds in object set to bools instead of index
// to trigger selections. this makes multiselect possible
// without having to reimplement logic
export default function SelectHOC({ DefaultTrigger, Dropdown, type }) {
  const Select = (props) => {
    const Trigger = props.Trigger || DefaultTrigger;
    return (
      <div className={getClass(props, type)}>
        <Trigger {...props} />
        <Dropdown {...props} />
      </div>
    );
  };

  Select.propTypes = {
    caretAlign: PropTypes.oneOf([ 'left', 'center', 'right' ]),
    color: PropTypes.oneOf([ 'gray', 'white', 'teal' ]),
    dropdownPosition: PropTypes.oneOf([ 'above', 'below' ]),
    inline: PropTypes.bool,
    isOpen: PropTypes.bool,
    multiSelect: PropTypes.bool,
    onOpenToggle: PropTypes.func.isRequired,
    onSelectionToggle: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
      label: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
      description: PropTypes.string,
    })).isRequired,
    selectedOptions: PropTypes.objectOf(PropTypes.bool).isRequired,
    placeholder: PropTypes.string,
    search: PropTypes.func, // search(query, callback), callback is called on debounced input of the search or when enter is pressed
    Trigger: PropTypes.func, // allow passing in a custom Trigger as prop, so it's not necessary to import the HOC
    triggerLabel: PropTypes.string,
  };

  Select.defaultProps = {
    caretAlign: 'right',
    color: 'gray',
    dropdownPosition: 'below',
    inline: false,
    isOpen: false,
    multiSelect: false,
    placeholder: '', // TODO: does this override triggerLabel if empty? is it initial value?
    search: null,
    Trigger: null,
    triggerLabel: 'Select an option', // TODO: verify that this is a sensible default label
  };

  return Select;
}
