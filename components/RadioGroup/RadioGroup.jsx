import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Radio from './Radio.jsx';
import RadioButton from './RadioButton.jsx';

function getClassName({ buttons, color, stacked }) {
  return classNames({
    'radio-teal': color === 'teal',
    'radio-gray': color === 'gray',
    'radio--buttons': buttons,
    'radio--stacked': stacked,
  });
}

function getRadioComponent({ buttons, onChange, selectedIndex }) {
  return buttons ?
    (item, i) => <RadioButton onChange={onChange} index={i} key={i} checked={selectedIndex === i} {...item} /> :
    (item, i) => <Radio onChange={onChange} index={i} key={i} checked={selectedIndex === i} {...item} />;
}

const RadioGroup = ({ buttons, color, items, onChange, selectedIndex, stacked }) => (
  <div className='form'>
    <ul className={getClassName({ buttons, color, stacked })}>
      { items.map(getRadioComponent({ buttons, onChange, selectedIndex })) }
    </ul>
  </div>
);

const radioItemPropType = PropTypes.shape({ label: PropTypes.string.isRequired });

RadioGroup.propTypes = {
  buttons: PropTypes.bool,
  color: PropTypes.oneOf([ 'teal', 'gray' ]),
  items: PropTypes.arrayOf(radioItemPropType).isRequired,
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
  stacked: PropTypes.bool,
};

RadioGroup.defaultProps = {
  buttons: false,
  color: 'teal',
  onChange: () => {},
  selectedIndex: -1,
  stacked: false,
};

export default RadioGroup;
