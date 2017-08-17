import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Nav } from './ui';
import { Sidebar, Modal } from '../../index.js';
import { slug } from './util';

import Avatars from './sections/Avatars.jsx';
import Buttons from './sections/Buttons.jsx';
import Carousels from './sections/Carousels.jsx';
import Checkboxes from './sections/Checkboxes.jsx';
import Headers from './sections/Headers.jsx';
import Icons from './sections/Icons.jsx';
import Inputs from './sections/Inputs.jsx';
import Modals from './sections/Modals.jsx';
import Pagination from './sections/Pagination.jsx';
import Radios from './sections/Radios.jsx';
import Selects from './sections/Selects.jsx';
import Sidebars from './sections/Sidebars.jsx';
import Tags from './sections/Tags.jsx';
import Text from './sections/TextDemo.jsx';

const sections = {
  Avatars,
  Buttons,
  Carousels,
  Checkboxes,
  Headers,
  Icons,
  Inputs,
  Modals,
  Pagination,
  'Radio Groups': Radios,
  Selects,
  Sidebars,
  Tags,
  Text,
};

const sectionTitles = Object.keys(sections);

class AllComponents extends Component {
  constructor() {
    super();
    this.state = { activeSection: window.location.hash.slice(1) };
    this.updateScroll = this.updateScroll.bind(this);
    this.sectionElements = [];
    // this.calcSectionOf
  }
  componentWillMount() {
    window.addEventListener('scroll', this.updateHashOnScroll);
  }
  componentDidMount() {
    this.sectionElements = sectionTitles.map((title, index) => {
      const titleSlug = slug(title);
      const element = document.getElementById(titleSlug);
      return { titleSlug, element };
    });
    console.log(sectionElements);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateHashOnScroll);
  }
  updateHashOnScroll() {
    // minimum positive offset top is the current 'active' section
    // let minEl = this.sectionElements.reduce(());
    // for (let i = 0; i < this.sectionElements.length; i++) {
    //   const el = this.sectionElements[i].element;
    //   const offset =
    // }
  }
  render() {
    return (
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
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);
