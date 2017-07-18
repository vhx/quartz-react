import React from 'react';
import PropTypes from 'prop-types';
import { Button, sidebarModel } from '../../../index.js';
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
    <Block><Button onClick={() => sidebarModel.open(SidebarChildren)}>Open sidebar 1</Button></Block>
    <Block><Button onClick={() => sidebarModel.toggle(SidebarChildren)}>Toggle sidebar 1</Button></Block>
    <Hr />
    <Block><Button onClick={() => sidebarModel.open(OtherSidebarChildren)}>Open sidebar 2</Button></Block>
    <Block><Button onClick={() => sidebarModel.toggle(OtherSidebarChildren)}>Toggle sidebar 2</Button></Block>
    <Hr />
    <Block><Button onClick={() => sidebarModel.close()}>Close all sidebars</Button></Block>
    <Block><Button onClick={() => sidebarModel.open()}>Reopen most recent sidebar</Button></Block>
    <Block><Button onClick={() => sidebarModel.toggle()}>Toggle most recent sidebar</Button></Block>
  </div>
);

const sidebarCode = `
const Children = () => (
  <div>Sidebar children go here</div>
);

<Button onClick={() => sidebarModel.open(Children)}>
  Open sidebar
</Button>

<Button onClick={() => sidebarModel.close()}>
  Close sidebar
</Button>

<Button onClick={() => sidebarModel.toggle(Children)}>
  Toggle sidebar
</Button>

<Button onClick={() => sidebarModel.open()}>
  Reopen most recent sidebar
</Button>

<Button onClick={() => sidebarModel.toggle()}>
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
        Use the methods on its model:
        <pre className='code'>
          {
`sidebarModel.open(ChildComponent);
sidebarModel.close();
sidebarModel.toggle(ChildComponent);`
          }
        </pre>
        If you do intend to use the component (ie. you are adding a sidebar to an application that does
        not yet have any sidebars) then read on.
      </Details>
      <Details>
        The <code>&lt;Sidebar /&gt;</code> component accepts no props or children and should be initialized
        only <strong>once</strong> in the root component of your app. After this initialization,
        it will manage itself and respond only to updates through method calls on its model.
      </Details>
      <Details>
        Calling <code>sidebarModel.open()</code> or <code>sidebarModel.toggle()</code> without any arguments
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
