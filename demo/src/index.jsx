import React from 'react';
import ReactDOM from 'react-dom';

import {
  // Avatar,
  Button,
} from '../../index.js';

const AllComponents = () => (
  <div>
    <Button>Click me</Button>
    <Button color='teal'>Click me</Button>
  </div>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);

// const renderer = testUtils.createRenderer();

// test('VHX Quartz Components', (it) => {
//   test('Button', () => {
//     it('renders', (expect) => {
//       renderer.render(<Button>Foo</Button>);
//       const output = renderer.getRenderOutput();
//       expect(output.type).to.equal('button');
//       expect(output.props.children).to.equal('Foo');
//     });
//   });
// })();

