import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../index.js';
import {
  Block,
  DemoRow,
  PropTypeTable,
  Subtitle,
  Title,
} from '../ui';


// Text headings
// -----------------------------------------

const TextHeadings = () => (
  <div>
    <Subtitle>Headings</Subtitle>
    <Block><Text h1>Heading 1</Text></Block>
    <Block><Text h2>Heading 2</Text></Block>
    <Block><Text h3>Heading 3</Text></Block>
    <Block><Text h4>Heading 4</Text></Block>
    <Block><Text h5>Heading 5</Text></Block>
  </div>
);

const textHeadingCode = `
<Text h1>Heading 1</Text>
<Text h2>Heading 2</Text>
<Text h3>Heading 3</Text>
<Text h4>Heading 4</Text>
<Text h5>Heading 5</Text>
`;


// Text colors
// -----------------------------------------

const TextColors = () => (
  <div>
    <Subtitle>Colors</Subtitle>
    <Block><Text>Default</Text></Block>
    <Block><Text color='navy'>navy</Text></Block>
    <Block><Text color='teal'>teal</Text></Block>
    <Block><Text color='gray'>gray</Text></Block>
    <Block dark inline><Text color='white'>white</Text></Block>
  </div>
);

const textColorsCode = `
<Text>Default</Text>
<Text color='navy'>navy</Text>
<Text color='teal'>teal</Text>
<Text color='gray'>gray</Text>
<Text color='white'>white</Text>
`;


// Main exported demo
// -----------------------------------------

const TextDemo = ({ title }) => (
  <div>
    <DemoRow><Title>{title}</Title></DemoRow>
    <DemoRow code={textHeadingCode}><TextHeadings /></DemoRow>
    <DemoRow code={textColorsCode}><TextColors /></DemoRow>
    <DemoRow><PropTypeTable component={Text} /></DemoRow>
  </div>
);

TextDemo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TextDemo;
