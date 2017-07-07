import React from 'react';
import { Tag } from '../../index.js';
import {
  Block,
  DemoRow,
  Subtitle,
  Title,
} from './ui';


// Tags default demo
// -----------------------------------------

const TagsDemo = () => (
  <div>
    <Subtitle>Tags with Two Callbacks</Subtitle>
    <Block><Tag label='Default tag' onClick={() => alert('Success')} onRemove={() => alert('Removed')} /></Block>
  </div>
);

const tagsDemoCode = `
<Tag
  label='Default tag'
  onClick={(event) => alert('Success')}
  onRemove={(event) => alert('Removed')}
/>
`;

// Truncated demo
// -----------------------------------------

const TruncatedDemo = () => (
  <div>
    <Subtitle>Truncated Tags</Subtitle>
    <Block><Tag label='Truncated tag' maxLength={6} /></Block>
  </div>
);

const truncatedDemoCode = `
<Tag
  label='Truncated tag'
  maxLength={6}
/>
`;

// Processing demo
// -----------------------------------------

const ProcessingDemo = () => (
  <div>
    <Subtitle>Processing</Subtitle>
    <Block><Tag label='Foo' isProcessing /></Block>
  </div>
);

const processingDemoCode = `
<Tag label='Foo' isProcessing />
`;


// Main exported demo
// -----------------------------------------

const Tags = () => (
  <div>
    <DemoRow><Title>Tags</Title></DemoRow>
    <DemoRow code={tagsDemoCode}><TagsDemo /></DemoRow>
    <DemoRow code={truncatedDemoCode}><TruncatedDemo /></DemoRow>
    <DemoRow code={processingDemoCode}><ProcessingDemo /></DemoRow>
  </div>
);

export default Tags;
