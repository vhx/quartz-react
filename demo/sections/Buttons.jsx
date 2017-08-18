import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '../../index.js';
import {
  Block,
  DemoRow,
  PropTypeTable,
  Title,
  Subtitle,
} from '../ui';


// Colors demo
// -----------------------------------------

const colors = [
  'gray',
  'teal',
  'white',
  'red',
  'purple',
  'green',
  'slate',
  'black',
  'yellow',
  'twitter',
  'facebook',
  'tumblr',
  'paypal',
  'roku',
];

const ButtonColors = () => (
  <div>
    <Subtitle>Colors</Subtitle>
    <div>
      {
      colors.map(color => (
        <Block key={color} inline>
          <Button color={color}>{color}</Button>
        </Block>
      ))
      }
    </div>
    <Block dark><Button color='transparent'>transparent</Button></Block>
  </div>
);

const buttonColorsCode = `
<Button>Click me</Button>
<Button color='teal'>Click me</Button>
<Button color='transparent'>Click me</Button>
<Button color='roku'>Click me</Button>
`;


// Processing demo
// -----------------------------------------

const ButtonProcessing = () => (
  <div>
    <Subtitle>Processing State</Subtitle>
    <Block inline><Button processing>processing</Button></Block>
    <Block inline><Button color='teal' processing>processing</Button></Block>
    <Block inline><Button color='white' processing>processing</Button></Block>
    <Block inline><Button color='red' processing>processing</Button></Block>
  </div>
);

const buttonProcessingCode = `
<Button processing>Click me</Button>
`;


// Sizes demo
// -----------------------------------------

const ButtonSizes = () => (
  <div>
    <Subtitle>Sizes</Subtitle>
    <Block><Button size='small'>small</Button></Block>
    <Block><Button size='medium'>medium</Button></Block>
    <Block><Button size='large'>large</Button></Block>
    <Block><Button size='half'>half</Button></Block>
    <Block><Button size='fill'>fill</Button></Block>
  </div>
);

const buttonSizesCode = `
<Button size='small'>small</Button>
<Button size='medium'>medium</Button>
<Button size='large'>large</Button>
<Button size='half'>half</Button>
<Button size='fill'>fill</Button>
`;


// Typefaces demo
// -----------------------------------------

const ButtonTypefaces = () => (
  <div>
    <Subtitle>Typefaces</Subtitle>
    <Block><Button>Default</Button></Block>
    <Block><Button typeface='brandon'>Brandon</Button></Block>
  </div>
);

const buttonTypefacesCode = `
<Button>Default</Button>
<Button typeface='brandon'>Brandon</Button>
`;


// Icons demo
// -----------------------------------------

const ButtonIcons = () => (
  <div>
    <Subtitle>Icons</Subtitle>
    <Block><Button><Icon name='product' left button />Icon left</Button></Block>
    <Block><Button><Icon name='product' right button>Icon right</Icon></Button></Block>
    <Block><Button><Icon name='product' left button /><Icon name='product' right button>Icon both</Icon></Button></Block>
  </div>
);

const buttonIconsCode = `
<Button>
  <Icon name='product' left button />
  Icon left
</Button>

<Button>
  <Icon name='product' right button />
  Icon right
</Button>

<Button>
  <Icon name='product' left button />
  <Icon name='product' right button>Icon both</Icon>
</Button>
`;


// Main exported demo
// -----------------------------------------

const Buttons = () => (
  <div>
    <DemoRow><Title>Buttons</Title></DemoRow>
    <DemoRow code={buttonColorsCode}><ButtonColors /></DemoRow>
    <DemoRow code={buttonProcessingCode}><ButtonProcessing /></DemoRow>
    <DemoRow code={buttonSizesCode}><ButtonSizes /></DemoRow>
    <DemoRow code={buttonTypefacesCode}><ButtonTypefaces /></DemoRow>
    <DemoRow code={buttonIconsCode}><ButtonIcons /></DemoRow>
    <DemoRow><PropTypeTable component={Button} /></DemoRow>
  </div>
);

export default Buttons;
