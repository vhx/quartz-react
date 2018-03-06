import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Radio from './Radio.jsx';
import RadioButton from './RadioButton.jsx';
import { noop } from '../util';
import styles from './RadioGroup.scss';

function getClassName({ buttons, color, stacked }) {
  return classNames({
    [styles.blueRadio]: color === 'VimeoBlue',
    [styles.grayRadio]: color === 'SoutherlySky',
    [styles.buttonRadios]: buttons,
    [styles.stackedRadios]: stacked,
  });
}

function getRadioComponent({ buttons, onCheck, selectedIndex }) {
  return buttons ?
    (item, i) => <RadioButton onCheck={onCheck} index={i} key={item.uniqueId} checked={selectedIndex === i} {...item} /> :
    (item, i) => <Radio onCheck={onCheck} index={i} key={item.uniqueId} checked={selectedIndex === i} {...item} />;
}

const RadioGroup = ({ buttons, color, items, onCheck, selectedIndex, stacked }) => (
  <div className='form'>
    <ul className={getClassName({ buttons, color, stacked })}>
      { items.map(getRadioComponent({ buttons, onCheck, selectedIndex })) }
    </ul>
  </div>
);

const colors = [ 'VimeoBlue', 'SoutherlySky' ];

const radioItemPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  uniqueId: PropTypes.string.isRequired,
});

RadioGroup.propTypes = {
  buttons: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  items: PropTypes.arrayOf(radioItemPropType).isRequired,
  onCheck: PropTypes.func,
  selectedIndex: PropTypes.number,
  stacked: PropTypes.bool,
};

RadioGroup.defaultProps = {
  buttons: false,
  color: 'VimeoBlue',
  onCheck: noop,
  selectedIndex: -1,
  stacked: false,
};

RadioGroup.propDescriptions = {
  color: `One of: ["${colors.join('", "')}"]`,
  items: 'Array of { label: String, uniqueId: String }, where uniqueId will be used as they key and need only be unique among the items in the radioGroup, not globally unique.',
  onCheck: 'onCheck(event, itemIndex)',
};

export default RadioGroup;
