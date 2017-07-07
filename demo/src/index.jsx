import React from 'react';
import ReactDOM from 'react-dom';

import { Nav } from './ui';

import Buttons from './Buttons.jsx';
import Checkboxes from './Checkboxes.jsx';
import Icons from './Icons.jsx';
import Inputs from './Inputs.jsx';
import Radios from './Radios.jsx';
import Tags from './Tags.jsx';
import Text from './TextDemo.jsx';

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


const CustomTrigger = ({ isOpen, onOpenToggle }) => <button onClick={() => onOpenToggle(!isOpen)}>Choose something ({isOpen ? 'close' : 'open'})</button>;

/*
const AllComponents = () => (
  <div>
    <Nav />
    <div className='stage'>
      <div className='row'>
        <div className='column small-8 padding-reset'>
          <div className='guide-bar'>
            <Section title='Select'>
              <Subtitle>Default</Subtitle>
              <SelectDemo options={selectOpts} />
              <Subtitle>Minimal demo (copy this stateful component as a starting point)</Subtitle>
              <SelectMinimal options={selectOpts} />
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
              <SelectDemo options={selectOpts} inline Trigger={CustomTrigger} />
              <Subtitle>Multiselect</Subtitle>
              <SelectDemo options={selectOpts} multiSelect />
              <Subtitle>Select with search</Subtitle>
              <SelectSearchable options={selectOpts} />
              <Subtitle>Multiselect with search</Subtitle>
              <SelectSearchable options={selectOpts} multiSelect />
              <Subtitle>Select with options still loading</Subtitle>
              <SelectDemo options={selectOpts} isLoading />
              <Subtitle>Select with option descriptions</Subtitle>
              <SelectDemo options={selectOptsWithDescription} />
              <Subtitle>Media select</Subtitle>
              <MediaSelect options={mediaSelectOpts} />
              <Subtitle>Media multiselect with search and processing state</Subtitle>
              <MediaSelectProcessing multiSelect options={mediaSelectOpts} />
            </Section>
          </div>
        </div>
      </div>
    </div>
  </div>
);
*/


const sections = [
  'Buttons',
  'Checkboxes',
  'Icons',
  'Inputs',
  'Radio Groups',
  'Tags',
  'Text',
];

const AllComponents = () => (
  <div>
    <Nav sections={sections} />
    <div className='stage'>
      <Buttons />
      <Checkboxes />
      <Icons />
      <Inputs />
      <Radios />
      <Tags />
      <Text />
    </div>
  </div>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);
