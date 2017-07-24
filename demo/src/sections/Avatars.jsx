import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../../../index.js';
import {
  Block,
  DemoRow,
  Subtitle,
  Title,
  Details,
} from '../ui';


// Avatars headings
// -----------------------------------------

const AvatarDemo = () => (
  <div>
    <Subtitle>Headings</Subtitle>
    <Block inline><Avatar /></Block>
    <Block inline><Avatar 
      image="https://vhx.imgix.net/assets/1f843fdc-34da-4302-bd4f-06e5bd7ef2c3/IMG_7891.GIF"
      size="xsmall" 
      /></Block>
      <Block inline><Avatar 
        image="https://secure.gravatar.com/avatar/74b978ed4f10e05a6c2898c4f5516189.png"
        size="small" 
        /></Block>
      <Block inline><Avatar 
        image="https://secure.gravatar.com/avatar/74b978ed4f10e05a6c2898c4f5516189.png"
        size="medium" 
        /></Block>
      <Block inline><Avatar 
        image="https://secure.gravatar.com/avatar/460c13d4904dc7f889f00d2cd4c3e6e8.png"
        size="large" 
        /></Block>
    <Block inline><Avatar 
      image="https://vhx.imgix.net/assets/1f843fdc-34da-4302-bd4f-06e5bd7ef2c3/IMG_7891.GIF"
      size="xlarge" 
      /></Block>
  </div>
);

const avatarCode = `
<Avatar />
<Avatar 
image="https://[YOURIMAGEHERE].png"
size="xlarge" 
/>
`;


// Main exported demo
// -----------------------------------------

const Avatars = ({ title }) => (
  <div>
    <DemoRow>
      <Title>{title}</Title>
      <Details>
        Avatar images and sizes are optional.  The default size is medium.
      </Details>
      <Details>
        Avatar sizes available: <code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>.
      </Details>

    </DemoRow>
    <DemoRow code={avatarCode}><AvatarDemo /></DemoRow>

  </div>
);

Avatars.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Avatars;
