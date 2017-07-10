import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Text } from '../../../index.js';
import iconNames from '../../../components/Icon/icon-list.js';
import {
  Block,
  DemoRow,
  Title,
  Subtitle,
} from '../ui';


// All icons demo
// -----------------------------------------

const IconList = () => (
  <div>
    <Subtitle>All Icons</Subtitle>
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
  </div>
);

const iconListCode = `
<Icon name='product' />

// Optional hidden text can help when aligning
// icons with text of a specific line-height
<Icon name='product'>hidden text</Icon>
`;


// Icon sizes demo
// -----------------------------------------

const IconSizes = () => (
  <div>
    <Subtitle>Sizes</Subtitle>
    <Block inline><Icon name='product' size='xsmall' /></Block>
    <Block inline><Icon name='product' size='small' /></Block>
    <Block inline><Icon name='product' size='medium' /></Block>
    <Block inline><Icon name='product' size='large' /></Block>
    <Block inline><Icon name='product' size='xlarge' /></Block>
    <Block inline><Icon name='product' size='xxlarge' /></Block>
  </div>
);

const iconSizesCode = `
<Icon name='product' size='xsmall' />
<Icon name='product' size='small' />
<Icon name='product' size='medium' />
<Icon name='product' size='large' />
<Icon name='product' size='xlarge' />
<Icon name='product' size='xxlarge' />
`;


// Icon circle demo
// -----------------------------------------

const IconCircles = () => (
  <div>
    <Subtitle>Circles</Subtitle>
    <Block inline><Icon circle name='product' size='xsmall' /></Block>
    <Block inline><Icon circle name='product' size='small' /></Block>
    <Block inline><Icon circle name='product' size='medium' /></Block>
    <Block inline><Icon circle name='product' size='large' /></Block>
    <Block inline><Icon circle name='product' size='xlarge' /></Block>
    <Block inline><Icon circle name='product' size='xxlarge' /></Block>
  </div>
);

const iconCirclesCode = `
<Icon circle name='product' size='xsmall' />
<Icon circle name='product' size='small' />
<Icon circle name='product' size='medium' />
<Icon circle name='product' size='large' />
<Icon circle name='product' size='xlarge' />
<Icon circle name='product' size='xxlarge' />
`;


// Icon colors demo
// -----------------------------------------

const IconColors = () => (
  <div>
    <Subtitle>Colors</Subtitle>
    <Block inline><Icon name='product' size='medium' /></Block>
    <Block inline><Icon name='product' size='medium' color='navy' /></Block>
    <Block inline><Icon name='product' size='medium' color='teal' /></Block>
    <Block inline><Icon name='product' size='medium' color='gray' /></Block>
    <Block inline dark><Icon name='product' size='medium' color='white' /></Block>
  </div>
);

const iconColorsCode = `
<Icon name='product' />
<Icon name='product' color='navy' />
<Icon name='product' color='teal' />
<Icon name='product' color='gray' />
<Icon name='product' color='white' />
`;


// Main exported demo
// -----------------------------------------

const Icons = ({ title }) => (
  <div>
    <DemoRow><Title>{title}</Title></DemoRow>
    <DemoRow code={iconSizesCode}><IconSizes /></DemoRow>
    <DemoRow code={iconCirclesCode}><IconCircles /></DemoRow>
    <DemoRow code={iconColorsCode}><IconColors /></DemoRow>
    <DemoRow code={iconListCode}><IconList /></DemoRow>
  </div>
);

Icons.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Icons;
