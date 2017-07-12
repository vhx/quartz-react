import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../../../index.js';
import {
  Block,
  DemoRow,
  Details,
  Subtitle,
  Title,
} from '../ui';


// Checked / unchecked demo
// -----------------------------------------

const handler = () => alert('Hi!');
const StatelessCheckboxes = () => (
  <div>
    <Subtitle>Checked / unchecked</Subtitle>
    <Block><Checkbox uniqueId='c1' label='Foo' onChange={handler} /></Block>
    <Block><Checkbox uniqueId='c2' label='Bar' onChange={handler} checked /></Block>
  </div>
);

const statelessCheckboxCode = `
const handler = (event) => alert('Hi!');
<Checkbox uniqueId='c1' label='Foo' onChange={handler} />
<Checkbox uniqueId='c2' label='Bar' onChange={handler} checked />
`;


// Sizes demo
// -----------------------------------------

const StatelessCheckboxSizes = () => (
  <div>
    <Subtitle>Sizes</Subtitle>
    {/* readOnly prop only added to stop react warnings from polluting the console */}
    <Block><Checkbox uniqueId='c3' label='Foo' size='small' readOnly /></Block>
    <Block><Checkbox uniqueId='c4' label='Bar' size='medium' readOnly /></Block>
    <Block><Checkbox uniqueId='c5' label='Baz' size='large' readOnly /></Block>
    <Block><Checkbox uniqueId='c6' label='Foo' size='small' checked readOnly /></Block>
    <Block><Checkbox uniqueId='c7' label='Bar' size='medium' checked readOnly /></Block>
    <Block><Checkbox uniqueId='c8' label='Baz' size='large' checked readOnly /></Block>
  </div>
);

const statelessCheckboxSizesCode = `
<Checkbox uniqueId='c3' label='Foo' size='small' />
<Checkbox uniqueId='c4' label='Bar' size='medium' />
<Checkbox uniqueId='c5' label='Baz' size='large' />
<Checkbox uniqueId='c6' label='Foo' size='small' checked />
<Checkbox uniqueId='c7' label='Bar' size='medium' checked />
<Checkbox uniqueId='c8' label='Baz' size='large' checked />
`;


// Toggles demo
// -----------------------------------------

const StatelessCheckboxToggles = () => (
  <div>
    <Subtitle>Toggles</Subtitle>
    {/* readOnly prop only added to stop react warnings from polluting the console */}
    <Block><Checkbox uniqueId='c9' type='toggle' size='small' readOnly /></Block>
    <Block><Checkbox uniqueId='c10' type='toggle' size='small' checked readOnly /></Block>
  </div>
);

const statelessCheckboxTogglesCode = `
// Can use all the same sizes
// that default checkboxes accept
<Checkbox uniqueId='c9' type='toggle' size='small' />
<Checkbox uniqueId='c10' type='toggle' size='small' checked />
`;


// Stateful demo
// -----------------------------------------

class StatefulCheckbox extends Component {
  constructor() {
    super();
    this.state = { checked: true };
  }
  render() {
    const { props, state } = this;
    const { checked } = state;
    const toggle = () => this.setState({ checked: !checked });
    return <Checkbox { ...props } checked={checked} onChange={toggle} />;
  }
}

StatefulCheckbox.propTypes = Checkbox.propTypes;
StatefulCheckbox.defaultProps = Checkbox.defaultProps;


const StatefulCheckboxDemo = () => (
  <div>
    <Subtitle>Stateful Checkbox Demo</Subtitle>
    <Block><StatefulCheckbox uniqueId='c11' size='large' /></Block>
    <Block><StatefulCheckbox uniqueId='c12' type='toggle' size='large' /></Block>
  </div>
);

const statefulCheckboxCode = `
// An example stateful checkbox implementation
class StatefulCheckbox extends Component {
  constructor() {
    super();
    this.state = { checked: true };
  }
  render() {
    const { props, state } = this;
    const { checked } = state;
    const toggle = () => this.setState({ checked: !checked });
    return <Checkbox { ...props } checked={checked} onChange={toggle} />;
  }
}

// Usage of the stateful component
<StatefulCheckbox uniqueId='c11' size='large' />
<StatefulCheckbox uniqueId='c12' type='toggle' size='large' />
`;


// Main exported demo
// -----------------------------------------

const Checkboxes = ({ title }) => (
  <div>
    <DemoRow>
      <Title tag='Stateless'>{title}</Title>
      <Details>
        Checkboxes are strictly presentational, so in order
        to enable interactivity you must place them within a stateful
        component that reacts to their <code>onChange</code> method.
        Note that in the <code>onChange</code> method, <code>event.target</code>
        will be the native <code>input[type=checkbox]</code> element.
      </Details>
      <Details>
        The required <code>uniqueId</code> prop will be used as the
        checkbox element’s <code>id</code> and therefore must be globally
        unique. No other element on the page can have that ID!
      </Details>
    </DemoRow>
    <DemoRow code={statelessCheckboxCode}><StatelessCheckboxes /></DemoRow>
    <DemoRow code={statelessCheckboxSizesCode}><StatelessCheckboxSizes /></DemoRow>
    <DemoRow code={statelessCheckboxTogglesCode}><StatelessCheckboxToggles /></DemoRow>
    <DemoRow code={statefulCheckboxCode}><StatefulCheckboxDemo /></DemoRow>
  </div>
);

Checkboxes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Checkboxes;
