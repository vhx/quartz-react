import React from 'react';
import ReactDOM from 'react-dom';

import { Nav } from './ui';

import Buttons from './sections/Buttons.jsx';
import Carousels from './sections/Carousels.jsx';
import Checkboxes from './sections/Checkboxes.jsx';
import Icons from './sections/Icons.jsx';
import Inputs from './sections/Inputs.jsx';
import Radios from './sections/Radios.jsx';
import Tags from './sections/Tags.jsx';
import Text from './sections/TextDemo.jsx';
import Selects from './sections/Selects.jsx';

const sections = {
  Buttons,
  Carousels,
  Checkboxes,
  Icons,
  Inputs,
  'Radio Groups': Radios,
  Selects,
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
  </div>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);
