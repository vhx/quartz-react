import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, modalModel } from '../../../index.js';
import {
  Block,
  DemoRow,
  Details,
  Subtitle,
  Title,
} from '../ui';


// Shared
// -----------------------------------------

const MyModalContents = () => <div>Hello!</div>;

const actions = [
  { label: 'Cancel', callback: () => modalModel.close(), color: 'gray' },
  { label: 'Sign up', callback: () => alert('hi'), color: 'teal' },
];


// Modals
// -----------------------------------------

const Modals = () => (
  <div>
    <Subtitle>Modals</Subtitle>
    <Button onClick={() => modalModel.open({ actions, Children: MyModalContents, title: 'Hello' })}>Default Modal</Button>
  </div>
);

const modalDemoCode = `
const MyModalContents = () => <div>Hello!</div>;

const actions = [
  { label: 'Cancel', callback: () => modalModel.close(), color: 'gray' },
  { label: 'Sign up', callback: () => alert('hi'), color: 'teal' },
];

const modalContents = {
  actions,
  Children: MyModalContents,
  title: 'Hello'
};

<Button onClick={() => modalModel.open(modalContents)}>
  Default Modal
</Button>
`;


// Modal sizes
// -----------------------------------------

const ModalSizes = () => (
  <div>
    <Subtitle>Sizes</Subtitle>
    <Block inline><Button onClick={() => modalModel.open({ title: 'Hello', Children: MyModalContents, actions, size: 'small' })}>Small</Button></Block>
    <Block inline><Button onClick={() => modalModel.open({ title: 'Hello', Children: MyModalContents, actions, size: 'medium' })}>Medium</Button></Block>
    <Block inline><Button onClick={() => modalModel.open({ title: 'Hello', Children: MyModalContents, actions, size: 'large' })}>Large</Button></Block>
  </div>
);

const modalSizesCode = `
<Button
  onClick={() => modalModel.open({
    actions,
    Children: MyModalContents,
    size: 'small',
    title: 'Hello',
  })}>
  Small
</Button>

<Button
  onClick={() => modalModel.open({
    actions,
    Children: MyModalContents,
    size: 'medium',
    title: 'Hello',
  })}>
  Medium
</Button>

<Button
  onClick={() => modalModel.open({
    actions,
    Children: MyModalContents,
    size: 'large',
    title: 'Hello',
  })}>
  Large
</Button>
`;


// Modal actions
// -----------------------------------------

const singleAction = [
  { label: 'Cancel', callback: () => modalModel.close() },
];

const doubleAction = [
  { label: 'Cancel', callback: () => modalModel.close(), color: 'gray' },
  { label: 'Sign up', callback: () => alert('hi'), color: 'teal' },
];

const ModalActions = () => (
  <div>
    <Subtitle>Actions</Subtitle>
    <Block inline><Button onClick={() => modalModel.open({ title: 'Hello', Children: MyModalContents, actions: singleAction })}>Single action</Button></Block>
    <Block inline><Button onClick={() => modalModel.open({ title: 'Hello', Children: MyModalContents, actions: doubleAction })}>Double action</Button></Block>
  </div>
);

const modalActionsCode = `
const singleAction = [
  { label: 'Cancel', callback: () => modalModel.close() },
];

<Button
  onClick={() => modalModel.open({
    title: 'Hello',
    Children: MyModalContents,
    actions: singleAction,
  })}>
  Single action
</Button>


const doubleAction = [
  { label: 'Cancel', callback: () => modalModel.close(), color: 'gray' },
  { label: 'Sign up', callback: () => alert('hi'), color: 'teal' },
];

<Button
  onClick={() => modalModel.open({
    title: 'Hello',
    Children: MyModalContents,
    actions: doubleAction,
  })}>
  Double action
</Button>
`;


// Main exported demo
// -----------------------------------------

const ModalDemo = ({ title }) => (
  <div>
    <DemoRow>
      <Title>{title}</Title>
      <Details>
        <strong>Important:</strong> You probably do not want to use the Modal as a component! Use the methods of the model:
        <pre className='code'>
          {
`modalModel.open({
  actions: Array<Object>,
  Children: ReactComponent,
  size: String,
  title: String
});
modalModel.close();`
          }
        </pre>
      </Details>
      <Details>
        The <code>&lt;Modal /&gt;</code> component accepts no props or children and should be initialized
        only <strong>once</strong> in the root component of your app. After this initialization,
        it will manage itself and respond only to updates through its model method calls.
      </Details>
      <Details>
        The <code>actions</code> array consists of objects of the following shape:
        <pre className='code'>
          {
`{
  color: String (optional),
  label: String,
  callback: Function,
}`
          }
        </pre>
      </Details>
    </DemoRow>
    <DemoRow code={modalDemoCode}><Modals /></DemoRow>
    <DemoRow code={modalSizesCode}><ModalSizes /></DemoRow>
    <DemoRow code={modalActionsCode}><ModalActions /></DemoRow>
    <Modal />
  </div>
);

ModalDemo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ModalDemo;
