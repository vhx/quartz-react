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
    <Block><Text h6>Heading 6</Text></Block>
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
    <Block><Text color='AstroGranite'>Astrogranite</Text></Block>
    <Block><Text color='RegentGray'>Regent Gray</Text></Block>
    <Block><Text color='SoutherlySky'>Southerly Sky</Text></Block>
    <Block dark><Text color='Porcelain'>Porcelain</Text></Block>
    <Block dark><Text color='Paste'>Paste</Text></Block>
    <Block><Text color='VimeoBlue'>Vimeo Blue</Text></Block>
    <Block><Text color='VimeoBlue-Darkened'>Vimeo Blue Darkened</Text></Block>
    <Block><Text color='Pistachio'>Pistachio</Text></Block>
    <Block><Text color='Pistachio-Darkened'>Pistachio Darkened</Text></Block>
    <Block dark><Text color='RumSwizzle'>Rum Swizzle</Text></Block>
    <Block><Text color='SunsetOrange'>Sunset Orange</Text></Block>
    <Block><Text color='SunsetOrange-Darkened'>Sunset Orange Darkened</Text></Block>
    <Block dark><Text color='PalePink'>Pale Pink</Text></Block>
    <Block dark><Text color='white'>white</Text></Block>
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

const TextDemo = () => (
  <div>
    <DemoRow><Title>Text</Title></DemoRow>
    <DemoRow code={textHeadingCode}><TextHeadings /></DemoRow>
    <DemoRow code={textColorsCode}><TextColors /></DemoRow>
    <DemoRow><PropTypeTable component={Text} /></DemoRow>
  </div>
);

export default TextDemo;
