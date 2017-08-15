import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle.jsx';

const propTypeList = Object.keys(PropTypes);

function lookupType(propType) {
  return propTypeList.reduce((current, next) => {
    return (propType === PropTypes[next] || propType === PropTypes[next].isRequired) ? next : current;
  }, 'other');
}

function stringify(prop) {
  if (typeof prop === 'string') return `"${prop}"`;
  if (typeof prop === 'function') return prop.name || '[Function]';
  if (String(prop) === '[object Object]') return JSON.stringify(prop);
  return String(prop);
}

class PropTypeTable extends PureComponent {
  constructor(props) {
    super(props);
    const componentPropTypes = props.component.propTypes || {};
    const componentDefaultProps = props.component.defaultProps || {};
    const componentPropDescriptions = props.component.propDescriptions || {};
    this.propList = Object.keys(componentPropTypes).map(prop => ({
      prop,
      type: lookupType(componentPropTypes[prop]),
      defaultValue: stringify(componentDefaultProps[prop]),
      description: componentPropDescriptions[prop],
      isRequired: componentPropTypes[prop].isRequired === undefined,
    }));
  }
  render() {
    return (
      <div>
        <Subtitle>PropTypes</Subtitle>
        <table className='table table--ticks table--striped margin-bottom-large'>
          <thead>
            <tr>
              <th className='small-2'>Prop</th>
              <th className='small-2'>Type</th>
              <th className='small-2'>Required</th>
              <th className='small-3'>Default value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.propList.map(({ prop, type, defaultValue, description, isRequired }) => (
                <tr key={prop}>
                  <td><strong>{prop}</strong></td>
                  <td>{type}</td>
                  <td>{isRequired ? 'yes' : 'no' }</td>
                  <td><code>{defaultValue}</code></td>
                  <td>{description}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

PropTypeTable.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PropTypeTable;
