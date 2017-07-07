import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MediaSelect, Select } from '../../index.js';
import {
  Block,
  Details,
  DemoRow,
  Subtitle,
  Title,
} from './ui';

// TODO: const CustomTrigger = ({ isOpen, onOpenToggle }) => <button onClick={() => onOpenToggle(!isOpen)}>Choose something ({isOpen ? 'close' : 'open'})</button>;

// Intro
// -----------------------------------------

const options = [
  {
    label: 'One',
    uniqueId: 'opt-1',
    description: 'Foo',
    imageUrl: '/images/1.jpg',
  },
  {
    label: 'Two',
    uniqueId: 'opt-2',
    description: 'Bar',
    imageUrl: '/images/2.jpg',
  },
  {
    label: 'Three',
    uniqueId: 'opt-3',
    description: 'Baz',
    imageUrl: '/images/3.jpg',
  },
];

const selection = {
  'opt-1': false,
  'opt-2': true,
  'opt-3': true,
};


const introCode = `


const options = [
  {
    label: 'One',
    uniqueId: 'opt-1',
    description: 'Foo',
    imageUrl: '/images/1.jpg',
  },
  {
    label: 'Two',
    uniqueId: 'opt-2',
    description: 'Bar',
    imageUrl: '/images/2.jpg',
  },
  {
    label: 'Three',
    uniqueId: 'opt-3',
    description: 'Baz',
    imageUrl: '/images/3.jpg',
  },
];


const selection = {
  'opt-1': false,
  'opt-2': true,
  'opt-3': true
};
`;


// Default demo
// -----------------------------------------

function handleOpenToggle(isOpen) {
  // The select dropdown was either opened or closed
}
function handleSelectionToggle(selection, computedLabel, option) {
  // An option was selected
  // \`selection\` is a new object of the form \`{ 'opt-1': true, 'opt-2': false }\`
  // \`computedLabel\` is a string you can use to replace the trigger label with the selection's label
  // \`option\` is the object that was selected from the \`options\` array
}

const SelectDemo = () => (
  <div>
    <Subtitle>Default</Subtitle>
    <Select
      options={options}
      onOpenToggle={handleOpenToggle}
      selectedOptions={selection}
      onSelectionToggle={handleSelectionToggle}
      isOpen
      multiSelect
    />
  </div>
);

const selectDemoCode = `

function handleOpenToggle(isOpen) {
  // The select dropdown was either opened or closed
}
function handleSelectionToggle(selection, computedLabel, option) {
  // An option was selected
  // \`selection\` is a new object of the form \`{ 'opt-1': true, 'opt-2': false }\`
  // \`computedLabel\` is a string you can use to replace the trigger label with the selection's label
  // \`option\` is the object that was selected from the \`options\` array
}

<Select
  options={options}
  onOpenToggle={handleOpenToggle}
  selectedOptions={selection}
  onSelectionToggle={handleSelectionToggle}
  isOpen
  multiSelect
/>
`;


// Media demo
// -----------------------------------------

const MediaDemo = () => (
  <div>
    <Subtitle>Media Select</Subtitle>
    <MediaSelect
      options={options}
      onOpenToggle={handleOpenToggle}
      selectedOptions={selection}
      onSelectionToggle={handleSelectionToggle}
      isOpen
      multiSelect
    />
  </div>
);

const mediaDemoCode = `
<MediaSelect
  options={options}
  onOpenToggle={handleOpenToggle}
  selectedOptions={selection}
  onSelectionToggle={handleSelectionToggle}
  isOpen
  multiSelect
/>




`;

// Minimal stateful demo
// -----------------------------------------

class SelectMinimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOptions: {},
      selectedLabel: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selectedOptions, selectedLabel /*, optionToggled, optionWillBeChecked */) {
    this.setState({ selectedOptions, selectedLabel });
  }
  render() {
    const setOpen = isOpen => this.setState({ isOpen });
    return (
      <Select
        {...this.props}
        isOpen={this.state.isOpen}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={setOpen}
        triggerLabel={this.state.selectedLabel}
      />
    );
  }
}

const MinimalDemo = () => (
  <div>
    <Subtitle>Minimal Stateful Select</Subtitle>
    <SelectMinimal options={options} />
  </div>
);

const minimalDemoCode = `
// An example stateful select implementation
class SelectMinimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOptions: {},
      selectedLabel: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selectedOptions, selectedLabel /*, optionToggled, optionWillBeChecked */) {
    this.setState({ selectedOptions, selectedLabel });
  }
  render() {
    const setOpen = isOpen => this.setState({ isOpen });
    return (
      <Select
        {...this.props}
        isOpen={this.state.isOpen}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={setOpen}
        triggerLabel={this.state.selectedLabel}
      />
    );
  }
}

// Usage of the stateful component
<SelectMinimal options={options} />
`;


// Complete stateful media component
// -----------------------------------------

class MediaSelectDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isOpen: false,
      selectedOptions: {},
      selectedLabel: '',
      filteredOptions: props.options,
      searchValue: '',
      processingOptions: [],
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel, option /* , optionWillBeChecked */) {
    const { processingOptions } = this.state;
    this.setState({ processingOptions: processingOptions.concat(option.uniqueId) });
    // (setTimeout to simulate delay due to ajax request)
    setTimeout(() => {
      const optionIndex = processingOptions.indexOf(option.uniqueId);
      if (optionIndex !== -1) { processingOptions.splice(optionIndex, 1); }
      this.setState({
        selectedOptions,
        selectedLabel,
        processingOptions,
      });
    }, 300);
  }

  search(query) {
    const opts = this.props.options;
    this.setState({ searchValue: query, isLoading: true });
    // (setTimeout to simulate delay due to ajax request)
    setTimeout(() => {
      const filteredOptions = opts.filter(opt => opt.label.indexOf(query) !== -1);
      this.setState({ filteredOptions, isLoading: false });
    }, 300);
  }

  render() {
    return (
      <MediaSelect
        {...this.props}
        isOpen={this.state.isOpen}
        isLoading={this.state.isLoading}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={this.setOpen}
        triggerLabel={this.state.selectedLabel}
        search={this.search}
        searchValue={this.state.searchValue}
        options={this.state.filteredOptions}
        processingOptions={this.state.processingOptions}
      />
    );
  }
}


const CompleteDemo = () => (
  <div>
    <Subtitle>Stateful Media Multi-Select with Search and Processing State</Subtitle>
    <MediaSelectDemo options={options} multiSelect />
  </div>
);

const completeDemoCode = `
// An example stateful media select implementation
class StatefulMediaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isOpen: false,
      selectedOptions: {},
      selectedLabel: '',
      filteredOptions: props.options,
      searchValue: '',
      processingOptions: [],
    };
    this.setOpen = this.setOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  handleChange(selectedOptions, selectedLabel, option /* , optionWillBeChecked */) {
    const { processingOptions } = this.state;
    this.setState({ processingOptions: processingOptions.concat(option.uniqueId) });
    // (setTimeout to simulate delay due to ajax request)
    setTimeout(() => {
      const optionIndex = processingOptions.indexOf(option.uniqueId);
      if (optionIndex !== -1) { processingOptions.splice(optionIndex, 1); }
      this.setState({
        selectedOptions,
        selectedLabel,
        processingOptions,
      });
    }, 300);
  }

  search(query) {
    const opts = this.props.options;
    this.setState({ searchValue: query, isLoading: true });
    // (setTimeout to simulate delay due to ajax request)
    setTimeout(() => {
      const filteredOptions = opts.filter(opt => opt.label.indexOf(query) !== -1);
      this.setState({ filteredOptions, isLoading: false });
    }, 300);
  }

  render() {
    return (
      <MediaSelect
        {...this.props}
        isOpen={this.state.isOpen}
        isLoading={this.state.isLoading}
        selectedOptions={this.state.selectedOptions}
        onSelectionToggle={this.handleChange}
        onOpenToggle={this.setOpen}
        triggerLabel={this.state.selectedLabel}
        search={this.search}
        searchValue={this.state.searchValue}
        options={this.state.filteredOptions}
        processingOptions={this.state.processingOptions}
      />
    );
  }
}

// Usage of the stateful component
<StatefulMediaSelect options={options} multiSelect />
`;

// Main exported demo
// -----------------------------------------

const Selects = ({ title }) => (
  <div>
    <DemoRow code={introCode}>
      <Title tag='Stateless'>{title}</Title>
      <Details>
        Selects are strictly presentational, so in order
        to enable interactivity you must place them within a stateful
        component that reacts to their <code>onOpenToggle</code> and
        <code>onSelectionToggle</code> methods. Several stateful
        examples are provided below.
      </Details>
      <Details>
        The set of options passed to the select must be an array of objects
        of the following form:
        <pre className='code'>
          {
  `{
  uniqueId: String,
  label: String,
  description: String?,
  imageUrl: String?
}`
          }
        </pre>
        The <code>uniqueId</code> property will be used as a <code>key</code>,
        so it does not need to be globally unique—just unique among the options.
      </Details>
      <Details>
        The select also accepts a <code>selectedOptions</code> prop used to
        specify which of those options are selected.
        <pre className='code'>
          {
  `{
  'opt-1': false,
  'opt-2': true,
  'opt-3': true
}`
          }
        </pre>
        In this example the last two options will be selected. For convenience,
        <code>undefined</code> options will also be treated as false, so the
        following is equivalent:
        <pre className='code'>
          {
  `{
  'opt-2': true,
  'opt-3': true
}`
          }
        </pre>
      </Details>
    </DemoRow>
    <DemoRow code={selectDemoCode}><SelectDemo /></DemoRow>
    <DemoRow code={mediaDemoCode}><MediaDemo /></DemoRow>
    <DemoRow code={minimalDemoCode}><MinimalDemo /></DemoRow>
    <DemoRow code={completeDemoCode}><CompleteDemo /></DemoRow>
  </div>
);

Selects.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Selects;

/*
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
*/
