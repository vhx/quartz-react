/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { excludeProps } from '../util';

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
      <input {...excludeProps([ 'label', 'uniqueId', 'size', 'type' ], props)} type='checkbox' name={props.uniqueId} id={props.uniqueId} />
      <label htmlFor={props.uniqueId}>
        <span className='checkbox--contain'>
          { props.type === 'toggle' ? <ToggleCheckbox /> : <StandardCheckbox /> }
          <span className='checkbox--label'>{props.label}</span>
        </span>
      </label>
    </fieldset>
  </div>
);


const sizes = [ 'small', 'medium', 'large' ];
const types = [ 'standard', 'toggle' ];

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.node,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(sizes),
  type: PropTypes.oneOf(types),
  uniqueId: PropTypes.string.isRequired,
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

Checkbox.propDescriptions = {
  size: `One of: ["${sizes.join('", "')}"]`,
  type: `One of: ["${types.join('", "')}"]`,
  uniqueId: 'Must be globally unique—this sets the checkbox element\'s id attribute.',
};

export default Checkbox;
