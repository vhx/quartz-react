import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header } from '../../index.js';
import {
  DemoRow,
  PropTypeTable,
  Subtitle,
  Title,
} from '../ui';


// Standard header
// -----------------------------------------

const DefaultDemo = () => (
  <div>
    <Subtitle>Default</Subtitle>
    <Header icon='product' title='Hello World' Description='Optional description' />
  </div>
);

const defaultDemoCode = `
<Header
  icon='product'
  title='Hello World'
  Description='Optional description'
/>
`;

// Header with all options/props
// -----------------------------------------

const HeaderDescription = () => (
  <div className='text--teal'>Foo</div>
);

const FullDemo = () => (
  <div>
    <Subtitle>Header with All Options</Subtitle>
    <Header icon='product' title='Hello World' Description={HeaderDescription} border={false}>
      <Button>Click me</Button>
    </Header>
  </div>
);

const fullDemoCode = `
// \`Description\` can be a component or a string
const HeaderDescription = () => (
  <div className='text--teal'>Foo</div>
);

// Children can optionally be passed to the <Header>
<Header icon='product' title='Hello World' Description={HeaderDescription} border={false}>
  <Button>Click me</Button>
</Header>
`;


// Main exported demo
// -----------------------------------------

const Headers = () => (
  <div>
    <DemoRow><Title>Headers</Title></DemoRow>
    <DemoRow code={defaultDemoCode}><DefaultDemo /></DemoRow>
    <DemoRow code={fullDemoCode}><FullDemo /></DemoRow>
    <DemoRow><PropTypeTable component={Header} /></DemoRow>
  </div>
);

export default Headers;
