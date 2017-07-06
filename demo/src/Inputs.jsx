import React from 'react';
import { Input } from '../../index.js';
import {
  Block,
  DemoRow,
  Details,
  Title,
  Subtitle,
} from './ui';


// Input demo
// -----------------------------------------

const InputDemo = () => (
  <div>
    <Subtitle>Default input</Subtitle>
    <Block><Input value='A normal input' /></Block>
    <Block><Input value='' placeholder='An input with a placeholder' /></Block>
    <Block><Input value='A disabled input' disabled /></Block>
    <Block><Input value='An input with an error' error /></Block>
    <Block><Input value='A small input' small /></Block>
    <Block><Input value='A search input' search /></Block>
    <Block><Input value='A password input' type='password' /></Block>
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
      value='123456'
    />
  </div>
);

const inputLabelCode = `
<label htmlFor='password123'>Password</label>
<Input
  id='password123'
  type='password'
  value='123456'
/>
`;


// Main exported demo
// -----------------------------------------

const Inputs = () => (
  <div>
    <DemoRow>
      <Title>Inputs</Title>
      <Details>
        Inputs are strictly presentational, so in order
        to enable interactivity you must place them within a stateful
        component that reacts to one or more of the following methods:
        <ul className='demo-list'>
          <li><code>onChange</code></li>
          <li><code>onKeyUp</code></li>
          <li><code>onKeyDown</code></li>
          <li><code>onKeyPress</code></li>
          <li><code>onInput</code></li>
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
  </div>
);

export default Inputs;
