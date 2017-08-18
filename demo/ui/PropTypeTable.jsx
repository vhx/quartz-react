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
              <th className='small-3' title='Prop'>Prop</th>
              <th className='small-2' title='Type'>Type</th>
              <th className='small-2' title='Required'>Required</th>
              <th className='small-3' title='Default value'>Default value</th>
              <th title='Description'>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.propList.map(({ prop, type, defaultValue, description, isRequired }) => (
                <tr key={prop}>
                  <td className='truncate text--bold' title={prop}>{prop}</td>
                  <td title={type}>{type}</td>
                  <td className={isRequired ? 'text--bold' : ''}>{isRequired ? 'yes' : 'no'}</td>
                  <td title={defaultValue}><code>{defaultValue}</code></td>
                  <td title={description}>{description}</td>
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
