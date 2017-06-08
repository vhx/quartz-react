import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Radio from '../Radio';

function getClassName({ color, stacked }) {
  return classNames({
    'radio-teal': color === 'teal',
    'radio-gray': color === 'gray',
    'radio--stacked': stacked,
  });
}

const RadioGroup = ({ color, items, onChange, selectedIndex, stacked }) => (
  <div className='form'>
    <ul className={getClassName({ color, stacked })}>
      { items.map((item, i) => <Radio onChange={onChange} index={i} key={item.uniqueId} checked={selectedIndex === i} {...item} />) }
    </ul>
  </div>
);

const radioItemPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  uniqueId: PropTypes.string.isRequired,
});

RadioGroup.propTypes = {
  color: PropTypes.oneOf([ 'teal', 'gray' ]),
  items: PropTypes.arrayOf(radioItemPropType).isRequired,
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
  stacked: PropTypes.bool,
};

RadioGroup.defaultProps = {
  color: 'teal',
  onChange: () => {},
  selectedIndex: -1,
  stacked: false,
};

export default RadioGroup;
