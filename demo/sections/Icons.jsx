import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Text } from '../../index.js';
import {
  Block,
  DemoRow,
  PropTypeTable,
  Title,
  Subtitle,
} from '../ui';

const testImage = '../demo/sections/upload.svg';

// Icon sizes demo
// -----------------------------------------

const IconSizes = () => (
  <div>
    <Subtitle>Sizes</Subtitle>
    <Block inline>
      <Icon
        size='xsmall'
        src={testImage}
      />
    </Block>
    <Block inline>
      <Icon
        size='small'
        src={testImage}
      />
    </Block>
    <Block inline>
      <Icon
        size='medium'
        src={testImage}
      />
    </Block>
    <Block inline>
      <Icon
        size='large'
        src={testImage}
      />
    </Block>
    <Block inline>
      <Icon
        size='xlarge'
        src={testImage}
      />
    </Block>
    <Block inline>
      <Icon
        size='xxlarge'
        src={testImage}
      />
    </Block>
  </div>
);

const iconSizesCode = `
  <Icon size='xxsmall' src={testImage} />
  <Icon size='xsmall' src={testImage} />
  <Icon size='small' src={testImage} />
  <Icon size='medium' src={testImage} />
  <Icon size='large' src={testImage} />
  <Icon size='xlarge' src={testImage} />
  <Icon size='xxlarge' src={testImage} />
`;


// Icon colors demo
// -----------------------------------------

const IconColors = () => (
  <div>
    <Subtitle>Colors</Subtitle>
    <Block inline>
      <Icon
        size='medium'
        src={testImage}
        color='white'
      />
    </Block>
    <Block inline>
      <Icon
        size='medium'
        src={testImage}
        color='VimeoBlue'
      />
    </Block>
    <Block inline>
      <Icon
        size='medium'
        src={testImage}
        color='SunsetOrange'
      />
    </Block>
    <Block inline>
      <Icon
        size='medium'
        src={testImage}
        color='Porcelain'
      />
    </Block>
    <Block inline>
      <Icon
        size='medium'
        src={testImage}
        color='AstroGranite'
      />
    </Block>
  </div>
);

const iconColorsCode = `
  <Icon name='product' size='medium' src={testImage} color='AstroGranite' />
`;


// Main exported demo
// -----------------------------------------

const Icons = () => (
  <div>
    <DemoRow><Title>Icons</Title></DemoRow>
    <DemoRow code={iconSizesCode}><IconSizes /></DemoRow>
    <DemoRow code={iconColorsCode}><IconColors /></DemoRow>
    <DemoRow><PropTypeTable component={Icon} /></DemoRow>
  </div>
);

export default Icons;
