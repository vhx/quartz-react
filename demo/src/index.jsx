import React from 'react';
import ReactDOM from 'react-dom';

import { Nav } from './ui';

import Buttons from './Buttons.jsx';
import Checkboxes from './Checkboxes.jsx';
import Icons from './Icons.jsx';
import Inputs from './Inputs.jsx';
import Radios from './Radios.jsx';
import Tags from './Tags.jsx';
import Text from './TextDemo.jsx';
import Selects from './Selects.jsx';

const sections = {
  Buttons,
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
