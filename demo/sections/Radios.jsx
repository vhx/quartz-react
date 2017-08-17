import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '../../index.js';
import {
  Block,
  DemoRow,
  Details,
  PropTypeTable,
  Subtitle,
  Title,
} from '../ui';


const items = [
  { label: '#1', uniqueId: 'opt-1', description: 'Foo' },
  { label: '#2', uniqueId: 'opt-2', description: 'Bar' },
  { label: '#3', uniqueId: 'opt-3', description: 'Baz' },
];

const handler = (event, index) => alert(index);

const introCode = `



const items = [
  { label: '#1', uniqueId: 'opt-1', description: 'Foo' },
  { label: '#2', uniqueId: 'opt-2', description: 'Bar' },
  { label: '#3', uniqueId: 'opt-3', description: 'Baz' },
];

const handler = (event, index) => alert(index);
`;

// Default demo
// -----------------------------------------

const StatelessRadio = () => (
  <div>
    <Subtitle>Standard</Subtitle>
    <Block><RadioGroup items={items} selectedIndex={0} onCheck={handler} /></Block>
  </div>
);

const statelessRadioCode = `
<RadioGroup
  items={items}
  selectedIndex={0}
  onCheck={handler}
/>
`;

// Colors
// -----------------------------------------

const RadioColors = () => (
  <div>
    <Subtitle>Color variants</Subtitle>
    <Block><RadioGroup items={items} selectedIndex={0} color='gray' /></Block>
    <Block><RadioGroup items={items} selectedIndex={0} color='teal' /></Block>
  </div>
);

const radioColorsCode = `
<RadioGroup
  items={items}
  selectedIndex={0}
  color='gray'
/>

<RadioGroup
  items={items}
  selectedIndex={0}
  color='teal'
/>
`;


// Stacked
// -----------------------------------------

const StackedRadio = () => (
  <div>
    <Subtitle>Stacked</Subtitle>
    <Block><RadioGroup items={items} selectedIndex={0} stacked /></Block>
  </div>
);

const stackedRadioCode = `
<RadioGroup
  items={items}
  selectedIndex={0}
  stacked
/>
`;


// Buttons
// -----------------------------------------

const RadioButtons = () => (
  <div>
    <Subtitle>Radio Buttons</Subtitle>
    <Block><RadioGroup items={items} selectedIndex={0} buttons /></Block>
  </div>
);

const radioButtonsCode = `
<RadioGroup
  items={items}
  selectedIndex={0}
  buttons
/>
`;


// Stateful demo
// -----------------------------------------

class StatefulRadio extends Component {
  constructor() {
    super();
    this.state = { selectedIndex: 0 };
  }
  render() {
    const { state, props } = this;
    const setIndex = (event, selectedIndex) => (
      this.setState({ selectedIndex })
    );
    return (
      <RadioGroup
        selectedIndex={state.selectedIndex}
        onCheck={setIndex}
        {...props}
      />
    );
  }
}

const StatefulDemo = () => (
  <div>
    <Subtitle>Stateful RadioGroup Demo</Subtitle>
    <Block><StatefulRadio items={items} buttons /></Block>
  </div>
);

// indentation wtf? TODO: figure this out -sebastian
const statefulDemoCode = `
// An example stateful checkbox implementation
class StatefulRadio extends Component {
  constructor() {
    super();
    this.state = { selectedIndex: 0 };
  }
  render() {
    const { state, props } = this;
    const setIndex = (event, selectedIndex) => (
      this.setState({ selectedIndex })
    );
    return (
      <RadioGroup
  selectedIndex={state.selectedIndex}
  onCheck={setIndex}
  {...props}
/>
    );
  }
}

// Usage of the stateful component
<StatefulRadio items={items} buttons />
`;


// Main exported demo
// -----------------------------------------

const Radios = () => (
  <div>
    <DemoRow code={introCode}>
      <Title>Radio Groups</Title>
      <Details>
        Radio groups are strictly presentational, so in order
        to enable interactivity you must place them within a stateful
        component that reacts to their <code>onCheck</code> method.
        Note that in the <code>onCheck</code> method, <code>event.target</code>
        will be the native <code>input[type=radio]</code> element. The second
        argument to the <code>onCheck</code> handler is the index of the new
        selected item in the <code>items</code> array.
      </Details>
      <Details>
        The required <code>uniqueId</code> property in objects within the
        <code>items</code> array will be used as a <code>key</code>, so it
        does not need to be globally unique—just unique among the items in
        the radio group.
      </Details>
      <Details>
        The objects in the <code>items</code> array can contain a
        <code>description</code> property that will be displayed if
        the radio group has the <code>buttons</code> prop enabled.
      </Details>
    </DemoRow>
    <DemoRow code={statelessRadioCode}><StatelessRadio /></DemoRow>
    <DemoRow code={radioColorsCode}><RadioColors /></DemoRow>
    <DemoRow code={stackedRadioCode}><StackedRadio /></DemoRow>
    <DemoRow code={radioButtonsCode}><RadioButtons /></DemoRow>
    <DemoRow code={statefulDemoCode}><StatefulDemo /></DemoRow>
    <DemoRow><PropTypeTable component={RadioGroup} /></DemoRow>
  </div>
);

export default Radios;
