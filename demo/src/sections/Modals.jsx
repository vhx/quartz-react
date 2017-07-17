import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from '../../../index.js';
import {
  DemoRow,
  Details,
  Subtitle,
  Title,
} from '../ui';


// Modals
// -----------------------------------------

const MyModalContents = () => <div>Hello!!!</div>;

const actions = [
  { label: 'Cancel', callback: () => Modal.close(), color: 'gray' },
  { label: 'Sign up', callback: () => alert('hi'), color: 'teal' },
];

const Modals = () => (
  <div>
    <Subtitle>Modals</Subtitle>
    <Button onClick={() => Modal.open({ title: 'Hello', Children: MyModalContents, actions, size: 'large' })}>Open</Button>
    <Modal />
  </div>
);

const modalDemoCode = `
const actions = [
  { label: 'Cancel', callback: () => Modal.close(), color: 'gray' },
  { label: 'Sign up', callback: () => alert('hi'), color: 'teal' },
];

const modalContents = {
  actions,
  title: 'Hello',
  Children: MyModalContents,
  size: 'large'
};

<Button onClick={() => Modal.open(modalContents)}>
  Open
</Button>
`;


// Main exported demo
// -----------------------------------------

const ModalDemo = ({ title }) => (
  <div>
    <DemoRow>
      <Title>{title}</Title>
      <Details>
        <strong>Important:</strong> You probably do not want to use the Modal as a component! Use its static methods:
        <pre className='code'>
          {
`Modal.open({
  actions: Array<Object>,
  Children: ReactComponent,
  size: String,
  title: String
});
Modal.close();`
          }
        </pre>
      </Details>
    </DemoRow>
    <DemoRow code={modalDemoCode}><Modals /></DemoRow>
  </div>
);

ModalDemo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ModalDemo;
