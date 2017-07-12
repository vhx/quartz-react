import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MediaSelect,
  Select,
  StatefulMediaSelect,
  StatefulSelect,
} from '../../../index.js';

import {
  Block,
  Details,
  DemoRow,
  Subtitle,
  Title,
} from '../ui';

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
      label: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selectedOptions, label /*, optionToggled, optionWillBeChecked */) {
    this.setState({ selectedOptions, label });
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
        triggerLabel={this.state.label}
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
      label: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selectedOptions, label /*, optionToggled, optionWillBeChecked */) {
    this.setState({ selectedOptions, label });
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
        triggerLabel={this.state.label}
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
      label: '',
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

  handleChange(selectedOptions, label, option /* , optionWillBeChecked */) {
    const { processingOptions } = this.state;
    this.setState({ processingOptions: processingOptions.concat(option.uniqueId) });
    // (setTimeout to simulate delay due to ajax request)
    setTimeout(() => {
      const optionIndex = processingOptions.indexOf(option.uniqueId);
      if (optionIndex !== -1) { processingOptions.splice(optionIndex, 1); }
      this.setState({
        selectedOptions,
        label,
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
        triggerLabel={this.state.label}
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
// An example stateful media select implementation.
// There's a lot of code here, but if you don't want
// all of this flexibility skip ahead to the section
// on default stateful select components.
class StatefulMediaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isOpen: false,
      selectedOptions: {},
      label: '',
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

  handleChange(selectedOptions, label, option /* , optionWillBeChecked */) {
    const { processingOptions } = this.state;
    this.setState({ processingOptions: processingOptions.concat(option.uniqueId) });
    // (setTimeout to simulate delay due to ajax request)
    setTimeout(() => {
      const optionIndex = processingOptions.indexOf(option.uniqueId);
      if (optionIndex !== -1) { processingOptions.splice(optionIndex, 1); }
      this.setState({
        selectedOptions,
        label,
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
        triggerLabel={this.state.label}
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

const StatefulDemo = () => (
  <div>
    <Subtitle>Default Stateful Select</Subtitle>
    <Details withDemo>
      The <code>Select</code> component that is provided by default
      is stateless and provides low-level control over the component.
      This is great if you want to customize a lot of the functionality,
      but in case you want a ready-to-go stateful component with minimal
      boilerplate there is also one provided.
    </Details>
    <StatefulSelect options={options} />
  </div>
);

const statefulDemoCode = `
import { StatefulSelect } from '@vhx/quartz-react';

<StatefulSelect options={options} />
`;


// Stateful colors demo
// -----------------------------------------

const StatefulColorsDemo = () => (
  <div>
    <Subtitle>Colors</Subtitle>
    <StatefulSelect options={options} color='gray' />
    <StatefulSelect options={options} color='white' />
    <StatefulSelect options={options} color='teal' />
  </div>
);

const statefulColorsDemoCode = `
<StatefulSelect options={options} color='gray' />
<StatefulSelect options={options} color='white' />
<StatefulSelect options={options} color='teal' />
`;


// Stateful carets demo
// -----------------------------------------

const StatefulCaretsDemo = () => (
  <div>
    <Subtitle>Caret positions</Subtitle>
    <Block><StatefulSelect options={options} triggerPlaceholder='Above and left' dropdownPosition='above' caretAlign='left' /></Block>
    <Block><StatefulSelect options={options} triggerPlaceholder='Above and center' dropdownPosition='above' caretAlign='center' /></Block>
    <Block><StatefulSelect options={options} triggerPlaceholder='Above and right' dropdownPosition='above' caretAlign='right' /></Block>
    <Block><StatefulSelect options={options} triggerPlaceholder='Below and left' caretAlign='left' /></Block>
    <Block><StatefulSelect options={options} triggerPlaceholder='Below and center' caretAlign='center' /></Block>
    <Block><StatefulSelect options={options} triggerPlaceholder='Below and right' caretAlign='right' /></Block>
  </div>
);

const statefulCaretsDemoCode = `
<StatefulSelect options={options} triggerPlaceholder='Above and left' dropdownPosition='above' caretAlign='left' />
<StatefulSelect options={options} triggerPlaceholder='Above and center' dropdownPosition='above' caretAlign='center' />
<StatefulSelect options={options} triggerPlaceholder='Above and right' dropdownPosition='above' caretAlign='right' />
<StatefulSelect options={options} triggerPlaceholder='Below and left' caretAlign='left' />
<StatefulSelect options={options} triggerPlaceholder='Below and center' caretAlign='center' />
<StatefulSelect options={options} triggerPlaceholder='Below and right' caretAlign='right' />
`;


// Multi-select demo
// -----------------------------------------

const StatefulMultiSelectDemo = () => (
  <div>
    <Subtitle>MultiSelect</Subtitle>
    <Block><StatefulSelect options={options} multiSelect /></Block>
  </div>
);

const statefulMultiSelectDemoCode = `
<StatefulSelect options={options} multiSelect />
`;


// Custom trigger demo
// -----------------------------------------
const MyTrigger = ({ isOpen, onOpenToggle }) => (
  <button onClick={() => onOpenToggle(!isOpen)}>
    Choose something ({isOpen ? 'close' : 'open'})
  </button>
);

MyTrigger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenToggle: PropTypes.func.isRequired,
};

const CustomTriggerDemo = () => (
  <div>
    <Subtitle>Custom Trigger</Subtitle>
    <Details withDemo>
      A custom trigger component can be passed to the <code>Select</code>.
      It will be passed the <code>isOpen</code> and <code>onOpenToggle</code>
      props from the parent <code>Select</code> component.
    </Details>
    <Block><StatefulSelect options={options} Trigger={MyTrigger} inline /></Block>
  </div>
);

const customTriggerDemoCode = `
const MyTrigger = ({ isOpen, onOpenToggle }) => (
  <button onClick={() => onOpenToggle(!isOpen)}>
    Choose something ({isOpen ? 'close' : 'open'})
  </button>
);

<StatefulSelect options={options} Trigger={MyTrigger} inline />
`;


// Default Stateful Media Select Demo
// -----------------------------------------

const StatefulMediaSelectDemo = () => (
  <div>
    <Subtitle>Default Stateful Media Select</Subtitle>
    <Details withDemo>
      A stateful variant of the <code>MediaSelect</code> is available
      for use as well, when full customization is not needed.
    </Details>
    <Block><StatefulMediaSelect options={options} multiSelect /></Block>
  </div>
);

const statefulMediaSelectDemoCode = `
import { StatefulMediaSelect } from '@vhx/quartz-react';

<StatefulMediaSelect options={options} multiSelect />
`;


// Main exported demo
// -----------------------------------------

const Selects = ({ title }) => (
  <div>
    <DemoRow code={introCode}>
      <Title>{title}</Title>
      <Details>
        Selects are, by default, strictly presentational, so in order
        to enable interactivity you must place them within a stateful
        component that reacts to their <code>onOpenToggle</code> and
        <code>onSelectionToggle</code> methods. For convenience, you
        can import the <code>StatefulSelect</code> instead which reduces
        some of the boilerplate at the price of reduced flexibility.
        Examples are provided below, both for implementing your own
        stateful select and for using the default stateful select.
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
      <Details>
        In addition, the <code>MediaSelect</code> can accept an array of
        ids corresponding to the options that are in a <code>processing</code>
        state. Those options will have a spinner icon displayed in the dropdown.
        An example of this is available in the section labeled <q>Stateful Media
        Multi-Select with Search and Processing State</q>.
      </Details>
    </DemoRow>
    <DemoRow code={selectDemoCode}><SelectDemo /></DemoRow>
    <DemoRow code={mediaDemoCode}><MediaDemo /></DemoRow>
    <DemoRow code={minimalDemoCode}><MinimalDemo /></DemoRow>
    <DemoRow code={completeDemoCode}><CompleteDemo /></DemoRow>
    <DemoRow code={statefulDemoCode}><StatefulDemo /></DemoRow>
    <DemoRow code={statefulColorsDemoCode}><StatefulColorsDemo /></DemoRow>
    <DemoRow code={statefulCaretsDemoCode}><StatefulCaretsDemo /></DemoRow>
    <DemoRow code={statefulMultiSelectDemoCode}><StatefulMultiSelectDemo /></DemoRow>
    <DemoRow code={customTriggerDemoCode}><CustomTriggerDemo /></DemoRow>
    <DemoRow code={statefulMediaSelectDemoCode}><StatefulMediaSelectDemo /></DemoRow>
  </div>
);

Selects.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Selects;
