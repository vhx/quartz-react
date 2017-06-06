import React from 'react';
import ReactDOM from 'react-dom';

import {
  // Avatar,
  Button,
} from '../../index.js';

const AllComponents = () => (
  <div>
    <h1>Buttons</h1>

    <h2>Colors</h2>
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
    <Button color='transparent'>transparent</Button>
    <Button color='twitter'>twitter</Button>
    <Button color='facebook'>facebook</Button>
    <Button color='tumblr'>tumblr</Button>
    <Button color='paypal'>paypal</Button>
    <Button color='roku'>roku</Button>

    <h2>Sizes</h2>
    <Button>default</Button>
    <Button size='small'>small</Button>
    <Button size='medium'>medium</Button>
    <Button size='large'>large</Button>
    <Button size='half'>half</Button>
    <Button size='fill'>fill</Button>

    <h2>Typefaces</h2>
    <Button>default</Button>
    <Button typeface='brandon'>brandon</Button>

  </div>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);
