import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../../index.js';
import {
  Block,
  DemoRow,
  Details,
  PropTypeTable,
  Subtitle,
  Title,
} from '../ui';


// Avatars headings
// -----------------------------------------

const AvatarDemo = () => (
  <div>
    <Subtitle>Headings</Subtitle>
    <Block inline><Avatar
      initial='A'
    /></Block>
    <Block inline><Avatar
      image='https://vhx.imgix.net/assets/1f843fdc-34da-4302-bd4f-06e5bd7ef2c3/IMG_7891.GIF'
      size='xsmall'
      initial='A'
    /></Block>
    <Block inline><Avatar
      image='https://secure.gravatar.com/avatar/74b978ed4f10e05a6c2898c4f5516189.png'
      size='small'
      initial='A'
    /></Block>
    <Block inline><Avatar
      image='https://secure.gravatar.com/avatar/74b978ed4f10e05a6c2898c4f5516189.png'
      size='medium'
      initial='A'
    /></Block>
    <Block inline><Avatar
      image='https://secure.gravatar.com/avatar/460c13d4904dc7f889f00d2cd4c3e6e8.png'
      size='large'
      initial='A'
    /></Block>
    <Block inline><Avatar
      image='https://vhx.imgix.net/assets/1f843fdc-34da-4302-bd4f-06e5bd7ef2c3/IMG_7891.GIF'
      size='xlarge'
      initial='A'
    /></Block>
  </div>
);

const avatarCode = `
<Avatar />
<Avatar
  image='/path/to/avatar.png'
  size='xlarge'
/>
`;


// Main exported demo
// -----------------------------------------

const Avatars = () => (
  <div>
    <DemoRow><Title>Avatar</Title></DemoRow>
    <DemoRow code={avatarCode}><AvatarDemo /></DemoRow>
    <DemoRow><PropTypeTable component={Avatar} /></DemoRow>
  </div>
);

export default Avatars;
