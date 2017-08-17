import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../../index.js';
import {
  Block,
  DemoRow,
  Details,
  PropTypeTable,
  Title,
  Subtitle,
} from '../ui';


// Input demo
// -----------------------------------------

const InputDemo = () => (
  <div>
    <Subtitle>Default input</Subtitle>
    <Block><Input value='A normal input' readOnly /></Block>
    <Block><Input value='' placeholder='An input with a placeholder' readOnly /></Block>
    <Block><Input value='A disabled input' disabled readOnly /></Block>
    <Block><Input value='An input with an error' error readOnly /></Block>
    <Block><Input value='A small input' small readOnly /></Block>
    <Block><Input value='A search input' search readOnly /></Block>
    <Block><Input value='A password input' type='password' readOnly /></Block>
  </div>
);

const inputDemoCode = `

<Input value='A normal input' />
<Input value='' placeholder='An input with a placeholder' />
<Input value='A disabled input' disabled />
<Input value='An input with an error' error />
<Input value='A small input' small />
<Input value='A search input' search />
<Input value='A password input' type='password' />
`;


// Labeled inputs
// -----------------------------------------

const InputLabel = () => (
  <div>
    <Subtitle>Labeled input</Subtitle>
    <label htmlFor='password123'>Password</label>
    <Input
      id='password123'
      type='password'
      value='1234'
      readOnly
    />
  </div>
);

const inputLabelCode = `
<label htmlFor='password123'>Password</label>
<Input
  id='password123'
  type='password'
  value='1234'
/>
`;


// Stateful demo
// -----------------------------------------

class StatefulInput extends Component {
  constructor() {
    super();
    this.state = { value: '' };
  }
  render() {
    const { props, state } = this;
    const handleInput = event => (
      this.setState({
        value: event.target.value,
      })
    );
    return <Input { ...props } value={state.value} onInput={handleInput} />;
  }
}

const StatefulInputDemo = () => (
  <div>
    <Subtitle>Stateful Input Demo</Subtitle>
    <Block><StatefulInput type='password' /></Block>
  </div>
);

const statefulInputCode = `
// An example stateful input implementation
class StatefulInput extends Component {
  constructor() {
    super();
    this.state = { value: '' };
  }
  render() {
    const { props, state } = this;
    const handleInput = (event) => (
      this.setState({
        value: event.target.value
      })
    );
    return <Input { ...props } value={state.value} onInput={handleInput} />;
  }
}

// Usage of the stateful component:
// (Notice that it can still receive
// props because of { ...props } in
// the implementation)
<StatefulInput type='password' />
`;


// Main exported demo
// -----------------------------------------

const Inputs = ({ title }) => (
  <div>
    <DemoRow>
      <Title>{title}</Title>
      <Details>
        Inputs are strictly presentational, so in order
        to enable interactivity you must place them within a stateful
        component that reacts to one or more of the following methods:
        <ul className='demo-list'>
          <li><code>onChange</code></li>
          <li><code>onInput</code></li>
          <li><code>onKeyDown</code></li>
          <li><code>onKeyPress</code></li>
          <li><code>onKeyUp</code></li>
        </ul>
        Note that in any of these methods, <code>event.target</code>
        will be the native <code>input</code> element.
      </Details>
      <Details>
        Any valid HTML attributes that can be applied to an <code>input</code> element,
        such as <code>id</code> or <code>onBlur</code>, can be passed to this component
        as props.
      </Details>
    </DemoRow>
    <DemoRow code={inputDemoCode}><InputDemo /></DemoRow>
    <DemoRow code={inputLabelCode}><InputLabel /></DemoRow>
    <DemoRow code={statefulInputCode}><StatefulInputDemo /></DemoRow>
    <DemoRow><PropTypeTable component={Input} /></DemoRow>
  </div>
);

Inputs.propTypes = {
  title: PropTypes.string.isRequired,
};


export default Inputs;
