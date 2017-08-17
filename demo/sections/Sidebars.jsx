import React from 'react';
import PropTypes from 'prop-types';
import { Button, Sidebar } from '../../index.js';
import {
  Block,
  DemoRow,
  Details,
  Hr,
  Subtitle,
  Title,
} from '../ui';

const SidebarChildren = () => <div>Sidebar children go here</div>;

const OtherSidebarChildren = () => (
  <div>
    <div>Here is some different content for the sidebar</div>
    <img src='/images/1.jpg' alt='yum' />
  </div>
);

const SidebarDemo = () => (
  <div>
    <Subtitle>Sidebar Demo</Subtitle>
    <Block><Button onClick={() => Sidebar.open(SidebarChildren)}>Open sidebar 1</Button></Block>
    <Block><Button onClick={() => Sidebar.toggle(SidebarChildren)}>Toggle sidebar 1</Button></Block>
    <Hr />
    <Block><Button onClick={() => Sidebar.open(OtherSidebarChildren)}>Open sidebar 2</Button></Block>
    <Block><Button onClick={() => Sidebar.toggle(OtherSidebarChildren)}>Toggle sidebar 2</Button></Block>
    <Hr />
    <Block><Button onClick={() => Sidebar.close()}>Close all sidebars</Button></Block>
    <Block><Button onClick={() => Sidebar.open()}>Reopen most recent sidebar</Button></Block>
    <Block><Button onClick={() => Sidebar.toggle()}>Toggle most recent sidebar</Button></Block>
  </div>
);

const sidebarCode = `
const Children = () => (
  <div>Sidebar children go here</div>
);

<Button onClick={() => Sidebar.open(Children)}>
  Open sidebar
</Button>

<Button onClick={() => Sidebar.close()}>
  Close sidebar
</Button>

<Button onClick={() => Sidebar.toggle(Children)}>
  Toggle sidebar
</Button>

<Button onClick={() => Sidebar.open()}>
  Reopen most recent sidebar
</Button>

<Button onClick={() => Sidebar.toggle()}>
  Toggle most recent sidebar
</Button>
`;


// Main exported demo
// -----------------------------------------

const Sidebars = ({ title }) => (
  <div>
    <DemoRow>
      <Title>{title}</Title>
      <Details>
        <strong>Important:</strong> You probably do not want to use the <code>Sidebar</code> as a component!
        Use its static methods:
        <pre className='code'>
          {
`Sidebar.open(ChildComponent);
Sidebar.close();
Sidebar.toggle(ChildComponent);`
          }
        </pre>
        If you do intend to use the component (ie. you are adding a sidebar to an application that does
        not yet have any sidebars) then read on.
      </Details>
      <Details>
        The <code>&lt;Sidebar /&gt;</code> component accepts no props or children and should be initialized
        only <strong>once</strong> in the root component of your app. After this initialization,
        it will manage itself and respond only to updates through its static method calls.
      </Details>
      <Details>
        Calling <code>Sidebar.open()</code> or <code>Sidebar.toggle()</code> without any arguments
        will reopen or toggle the sidebar with the most recently used children.
      </Details>
    </DemoRow>
    <DemoRow code={sidebarCode}><SidebarDemo /></DemoRow>
  </div>
);

Sidebars.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Sidebars;
