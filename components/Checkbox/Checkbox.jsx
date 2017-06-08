/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const getClassName = ({ type, size }) => classNames('checkbox', size, { alt: type === 'toggle' });


const StandardCheckbox = () => (
  <span className='checkbox--icon'>
    <span className='checkbox--animate' />
  </span>
);


const ToggleCheckbox = () => (
  <span>
    <span className='checkbox--icon' />
    <span className='checkbox--circle'>
      <i className='circle-top'><span /></i>
      <i className='circle-bottom'><span /></i>
    </span>
  </span>
);


// NOTE: .form does not affect styles in any way, but is required for proper checkbox
// styling since quartz/components.css nests .checkbox under .form. This limitation can
// probably very easily be removed by changing https://github.com/vhx/quartz/blob/master/quartz-js/components/checkbox/styles/checkbox.scss
// to have .checkbox not be required to be a descendent of .form
const Checkbox = props => (
  <div className='form'>
    <fieldset className={getClassName(props)}>
      <input type='checkbox' checked={props.checked} name={props.uniqueId} value={props.value} onChange={props.onChange} id={props.uniqueId} />
      <label htmlFor={props.uniqueId}>
        <span className='checkbox--contain'>
          { props.type === 'toggle' ? <ToggleCheckbox /> : <StandardCheckbox /> }
          <span className='checkbox--label'>{props.label}</span>
        </span>
      </label>
    </fieldset>
  </div>
);


Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  uniqueId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
  type: PropTypes.oneOf([ 'standard', 'toggle' ]),
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: false,
  label: '',
  onChange: null,
  size: 'medium',
  type: 'standard',
  value: '',
};

export default Checkbox;
