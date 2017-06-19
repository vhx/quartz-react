import React from 'react';
import ReactDOM from 'react-dom';
import iconNames from '../../components/Icon/icon-list.js';

import {
  Block,
  Section,
  Subtitle,
} from './demo-ui.jsx';

import {
  Button,
  Icon,
  // MediaSelect,
  Tag,
  // Select,
  Text,
} from '../../index.js';

import CheckboxDemo from './demo-checkbox.jsx';
import RadioDemo from './demo-radio.jsx';
import InputDemo from './demo-input.jsx';
import SelectDemo from './demo-select.jsx';

const selectOpts = [
  { label: 'Option #1', uniqueId: 'option-id-1' },
  { label: 'Option #2', uniqueId: 'option-id-2' },
  { label: 'Option #3', uniqueId: 'option-id-3' },
];

const selectOptsWithDescription = [
  { description: 'Hello World', label: 'Option #1', uniqueId: 'option-id-1' },
  { description: 'Hello Quartz', label: 'Option #2', uniqueId: 'option-id-2' },
  { description: 'Hello everyone', label: 'Option #3', uniqueId: 'option-id-3' },
];

const mediaSelectOpts = Array(20).fill(true).map((_, i) => ({
  imageUrl: `http://lorempizza.com/70/40/${i}`,
  description: 'Hello World',
  label: `Option #${i + 1}`,
  uniqueId: `option-id-${i}`,
}));

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
        <Button color='teal' processing>processing</Button>
        <Button color='white' processing>processing</Button>
        <Button color='red' processing>processing</Button>
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
      <Subtitle>Icons</Subtitle>
      <Block>
        { /* NOTE: icon--right can only be used if accompanying text is nested? */ }
        <Button><Icon name='product' left button />Icon left</Button>
        <Button><Icon name='product' right button>Icon right</Icon></Button>
        <Button><Icon name='product' left button /><Icon name='product' right button>Icon both</Icon></Button>
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
    <Section title='Icons'>
      <Subtitle>Sizes</Subtitle>
      <Icon name='product' size='xsmall' />
      <Icon name='product' size='small' />
      <Icon name='product' size='medium' />
      <Icon name='product' size='large' />
      <Icon name='product' size='xlarge' />
      <Icon name='product' size='xxlarge' />
      <Subtitle>Circles</Subtitle>
      <Icon circle name='product' size='xsmall' />
      <Icon circle name='product' size='small' />
      <Icon circle name='product' size='medium' />
      <Icon circle name='product' size='large' />
      <Icon circle name='product' size='xlarge' />
      <Icon circle name='product' size='xxlarge' />
      <Subtitle>Colors</Subtitle>
      <Icon name='product' size='medium' />
      <Icon name='product' size='medium' color='navy' />
      <Icon name='product' size='medium' color='teal' />
      <Icon name='product' size='medium' color='gray' />
      <Block inline dark><Icon name='product' size='medium' color='white' /></Block>
      <Subtitle>All icons</Subtitle>
      <ul className='small-block-grid-6 text-center'>
        {
          iconNames.map(icon => (
            <li key={icon}>
              <Block><Text color='gray' className='padding-bottom-small'>{icon}</Text></Block>
              <Icon name={icon} size='small' />
            </li>
          ))
        }
      </ul>
    </Section>
    <Section title='Inputs'>
      <Subtitle>Default input</Subtitle>
      <InputDemo />
      <Subtitle>disabled input</Subtitle>
      <InputDemo disabled />
      <Subtitle>Error input</Subtitle>
      <InputDemo error />
      <Subtitle>Input with placeholder</Subtitle>
      <InputDemo placeholder='With placeholder' />
      <Subtitle>Error input with placeholder</Subtitle>
      <InputDemo error placeholder='With placeholder' />
      <Subtitle>Password input</Subtitle>
      <InputDemo type='password' />
      <Subtitle>Password input with error</Subtitle>
      <InputDemo type='password' error />
      <Subtitle>Search input</Subtitle>
      <InputDemo placeholder='Search' search />
      <Subtitle>Labeled inputs</Subtitle>
      { /* by making <Input> a child of <label> we remove the need to create a unique ID */ }
      <label>
        <p>Username</p>
        <InputDemo />
      </label>
      { /* the standard usage of <label> will still work if you do not mind making an ID: */ }
      <label htmlFor='password1'>Password</label>
      <InputDemo type='password' id='password1' />
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
    <Section title='Tags'>
      <Block><Tag label='Tag with hover state' onClick={() => alert('Success')} onRemove={() => alert('Removed')} /></Block>
      <Block><Tag label='Truncated tag' maxLength={12} onClick={() => alert('Success')} onRemove={() => alert('Removed')} /></Block>
    </Section>
    <Section title='Select'>
      <Subtitle>Default</Subtitle>
      <SelectDemo options={selectOpts} />
      <Subtitle>Inline</Subtitle>
      <SelectDemo options={selectOpts} inline />
      <Subtitle>Colors</Subtitle>
      <SelectDemo options={selectOpts} color='gray' inline />
      <SelectDemo options={selectOpts} color='white' inline />
      <SelectDemo options={selectOpts} color='teal' inline />
      <Subtitle>Dropdown positioned above</Subtitle>
      <SelectDemo options={selectOpts} dropdownPosition='above' />
      <Subtitle>Custom trigger label placeholder</Subtitle>
      <SelectDemo options={selectOpts} triggerPlaceholder='Custom label' inline />
      <Subtitle>Caret alignment</Subtitle>
      <SelectDemo options={selectOpts} triggerPlaceholder='Above and left' dropdownPosition='above' caretAlign='left' inline />
      <SelectDemo options={selectOpts} triggerPlaceholder='Above and center' dropdownPosition='above' caretAlign='center' inline />
      <SelectDemo options={selectOpts} triggerPlaceholder='Above and right' dropdownPosition='above' caretAlign='right' inline />
      <br />
      <SelectDemo options={selectOpts} triggerPlaceholder='Below and left' caretAlign='left' inline />
      <SelectDemo options={selectOpts} triggerPlaceholder='Below and center' caretAlign='center' inline />
      <SelectDemo options={selectOpts} triggerPlaceholder='Below and right' caretAlign='right' inline />
      <Subtitle>Custom trigger element</Subtitle>
      <SelectDemo options={selectOpts} inline Trigger={({ isOpen, onOpenToggle }) => <button onClick={() => onOpenToggle(!isOpen)}>Choose something ({isOpen ? 'close' : 'open'})</button>} />
      <Subtitle>Multiselect</Subtitle>
      <SelectDemo options={selectOpts} multiSelect />
      <Subtitle>Select with search</Subtitle>
      <SelectDemo options={selectOpts} search={() => {}} />
      <Subtitle>Multiselect with search</Subtitle>
      <SelectDemo options={selectOpts} multiSelect search={() => {}} />
      <Subtitle>Select with options still loading</Subtitle>
      <SelectDemo options={selectOpts} isLoading />
      <Subtitle>Select with option descriptions</Subtitle>
      { /* NOTE: this does not work with `inline` */ }
      <SelectDemo options={selectOptsWithDescription} />
      <Subtitle>Media select</Subtitle>
      <SelectDemo type='media' options={mediaSelectOpts} />
      <Subtitle>Media multiselect with search</Subtitle>
      <SelectDemo type='media' multiSelect options={mediaSelectOpts} search={() => {}} />
      <Subtitle>Media multiselect with processing state</Subtitle>
      <SelectDemo type='media' multiSelect options={mediaSelectOpts} pretendToProcessOptions />
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
