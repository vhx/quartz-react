import React from 'react';
import ReactDOM from 'react-dom';

import { Nav } from './ui';
import { Sidebar, Modal } from '../../index.js';

import Buttons from './sections/Buttons.jsx';
import Carousels from './sections/Carousels.jsx';
import Checkboxes from './sections/Checkboxes.jsx';
import Icons from './sections/Icons.jsx';
import Inputs from './sections/Inputs.jsx';
import Modals from './sections/Modals.jsx';
import Radios from './sections/Radios.jsx';
import Selects from './sections/Selects.jsx';
import Sidebars from './sections/Sidebars.jsx';
import Tags from './sections/Tags.jsx';
import Text from './sections/TextDemo.jsx';

const sections = {
  Buttons,
  Carousels,
  Checkboxes,
  Icons,
  Inputs,
  Modals,
  'Radio Groups': Radios,
  Selects,
  Sidebars,
  Tags,
  Text,
};

const sectionTitles = Object.keys(sections);

const AllComponents = () => (
  <div>
    <Nav sections={sectionTitles} />
    <div className='stage'>
      {
        sectionTitles.map(section => React.createElement(sections[section], {
          key: section,
          title: section,
        }))
      }
    </div>
    <Sidebar />
    <Modal />
  </div>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);
