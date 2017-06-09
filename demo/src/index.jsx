import React from 'react';
import ReactDOM from 'react-dom';

import {
  Block,
  Section,
  Subtitle,
} from './demo-ui.jsx';

import {
  Button,
  Text,
} from '../../index.js';

import CheckboxDemo from './demo-checkbox.jsx';
import RadioDemo from './demo-radio.jsx';


const AllComponents = () => (
  <div>
    <Section title='Buttons'>
      <Subtitle>Colors</Subtitle>
      <Block inline>
        <Button>default</Button>
        <Button color='gray'>gray</Button>
        <Button color='teal'>teal</Button>
        <Button color='white'>white</Button>
        <Button color='red'>red</Button>
        <Button color='purple'>purple</Button>
        <Button color='green'>green</Button>
        <Button color='slate'>slate</Button>
        <Button color='black'>black</Button>
        <Button color='yellow'>yellow</Button>
      </Block>
      <Block dark inline>
        <Button color='transparent'>transparent</Button>
      </Block>
      <Block>
        <Button color='twitter'>twitter</Button>
        <Button color='facebook'>facebook</Button>
        <Button color='tumblr'>tumblr</Button>
        <Button color='paypal'>paypal</Button>
        <Button color='roku'>roku</Button>
      </Block>
      <Subtitle>Processing State</Subtitle>
      <Block>
        <Button processing>processing</Button>
      </Block>
      <Subtitle>Sizes</Subtitle>
      <Block>
        <Button>default</Button>
        <Button size='small'>small</Button>
        <Button size='medium'>medium</Button>
        <Button size='large'>large</Button>
        <Button size='half'>half</Button>
        <Button size='fill'>fill</Button>
      </Block>
      <Subtitle>Typefaces</Subtitle>
      <Block>
        <Button>default</Button>
        <Button typeface='brandon'>brandon</Button>
      </Block>
    </Section>
    <Section title='Checkboxes'>
      <CheckboxDemo uniqueId='checkbox-demo1' size='small' label='Small' />
      <CheckboxDemo uniqueId='checkbox-demo2' size='medium' label='Medium' />
      <CheckboxDemo uniqueId='checkbox-demo3' size='large' label='Large' />
      <CheckboxDemo uniqueId='checkbox-demo4' size='small' type='toggle' />
      <CheckboxDemo uniqueId='checkbox-demo5' size='medium' type='toggle' />
      <CheckboxDemo uniqueId='checkbox-demo6' size='large' type='toggle' />
    </Section>
    <Section title='Radios'>
      <Subtitle>Default</Subtitle>
      <RadioDemo items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Default gray</Subtitle>
      <RadioDemo color='gray' items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Stacked</Subtitle>
      <RadioDemo stacked items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Stacked gray</Subtitle>
      <RadioDemo stacked color='gray' items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Radio buttons</Subtitle>
      <RadioDemo buttons items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Radio buttons with descriptions</Subtitle>
      <RadioDemo buttons items={[{ label: 'Option 1', description: 'Description 1 goes here', uniqueId: 'opt1' }, { label: 'Option 2', description: 'Description 2 goes here', uniqueId: 'opt2' }]} />
    </Section>
    <Section title='Text'>
      <Subtitle>Headings</Subtitle>
      <Block><Text h1>h1</Text></Block>
      <Block><Text h2>h2</Text></Block>
      <Block><Text h3>h3</Text></Block>
      <Block><Text h4>h4</Text></Block>
      <Block><Text h5>h5</Text></Block>
      <Subtitle>Colors</Subtitle>
      <Block><Text>Default</Text></Block>
      <Block><Text color='navy'>navy</Text></Block>
      <Block><Text color='teal'>teal</Text></Block>
      <Block><Text color='gray'>gray</Text></Block>
      <Block dark inline><Text color='white'>white</Text></Block>
    </Section>
  </div>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);
