import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {
  // Avatar,
  Button,
  Text,
} from '../../index.js';

const Section = ({ children, title }) => (
  <div className='padding-large border-bottom'>
    <div className='padding-bottom-medium'>
      <Text h3>{title}</Text>
    </div>
    <div>{children}</div>
  </div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

const Block = ({ children, dark, inline }) => {
  const className = [
    'padding-small',
    dark ? 'bg-gray-7' : '',
    inline ? 'inline' : '',
  ].join(' ');
  return (
    <div className={className}>{children}</div>
  );
};

Block.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
  inline: PropTypes.bool,
};

Block.defaultProps = {
  dark: false,
  inline: false,
};

const Subtitle = ({ children }) => (
  <Block><Text h5>{children}</Text></Block>
);

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const AllComponents = () => (
  <div>
    <Section title='Buttons'>
      <Subtitle>Colors</Subtitle>
      <Block inline>
        <Button>default</Button>
        <Button color='gray'>gray</Button>
        <Button color='teal'>teal</Button>
        <Button color='white'>white</Button>
        <Button color='red'>red</Button>
        <Button color='purple'>purple</Button>
        <Button color='green'>green</Button>
        <Button color='slate'>slate</Button>
        <Button color='black'>black</Button>
        <Button color='yellow'>yellow</Button>
      </Block>
      <Block dark inline>
        <Button color='transparent'>transparent</Button>
      </Block>
      <Block>
        <Button color='twitter'>twitter</Button>
        <Button color='facebook'>facebook</Button>
        <Button color='tumblr'>tumblr</Button>
        <Button color='paypal'>paypal</Button>
        <Button color='roku'>roku</Button>
      </Block>
      <Subtitle>Processing State</Subtitle>
      <Block>
        <Button processing>processing</Button>
      </Block>
      <Subtitle>Sizes</Subtitle>
      <Block>
        <Button>default</Button>
        <Button size='small'>small</Button>
        <Button size='medium'>medium</Button>
        <Button size='large'>large</Button>
        <Button size='half'>half</Button>
        <Button size='fill'>fill</Button>
      </Block>
      <Subtitle>Typefaces</Subtitle>
      <Block>
        <Button>default</Button>
        <Button typeface='brandon'>brandon</Button>
      </Block>
    </Section>
    <Section title='Text'>
      <Subtitle>Headings</Subtitle>
      <Block><Text h1>h1</Text></Block>
      <Block><Text h2>h2</Text></Block>
      <Block><Text h3>h3</Text></Block>
      <Block><Text h4>h4</Text></Block>
      <Block><Text h5>h5</Text></Block>
      <Subtitle>Colors</Subtitle>
      <Block><Text>Default</Text></Block>
      <Block><Text color='navy'>navy</Text></Block>
      <Block><Text color='teal'>teal</Text></Block>
      <Block><Text color='gray'>gray</Text></Block>
      <Block dark inline><Text color='white'>white</Text></Block>
    </Section>
  </div>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);
