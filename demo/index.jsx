import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Nav } from './ui';
import { Sidebar, Modal } from '../index.js';

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

/* eslint-disable no-multi-spaces */
// `Section` is a component that renders a demo section
// `slug` is used in the url hash and section ids
// `title` is used as the text in the nav sidebar
const sections = [
  { Section: Avatars,     slug: 'avatars',      title: 'Avatars' },
  { Section: Buttons,     slug: 'buttons',      title: 'Buttons' },
  { Section: Carousels,   slug: 'carousels',    title: 'Carousels' },
  { Section: Checkboxes,  slug: 'checkboxes',   title: 'Checkboxes' },
  { Section: Headers,     slug: 'headers',      title: 'Headers' },
  { Section: Icons,       slug: 'icons',        title: 'Icons' },
  { Section: Inputs,      slug: 'inputs',       title: 'Inputs' },
  { Section: Modals,      slug: 'modals',       title: 'Modals' },
  { Section: Pagination,  slug: 'pagination',   title: 'Pagination' },
  { Section: Radios,      slug: 'radiogroups',  title: 'Radio Groups' },
  { Section: Selects,     slug: 'selects',      title: 'Selects' },
  { Section: Sidebars,    slug: 'sidebars',     title: 'Sidebars' },
  { Section: Tags,        slug: 'tags',         title: 'Tags' },
  { Section: Text,        slug: 'text',         title: 'Text' },
];
/* eslint-enable no-multi-spaces */

class AllComponents extends Component {
  constructor() {
    super();
    this.state = {
      activeSectionSlug: window.location.hash.slice(1),
    };
    this.updateOnScroll = this.updateOnScroll.bind(this);
    this.sectionElements = [];
  }
  componentWillMount() {
    window.addEventListener('scroll', this.updateOnScroll);
  }
  componentDidMount() {
    this.sectionElements = sections.map(({ slug }) => {
      const element = document.getElementById(slug);
      return { slug, element };
    });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateOnScroll);
  }
  updateOnScroll() {
    for (let i = 0; i < this.sectionElements.length; i++) {
      const prior = i === 0 ? 0 : i - 1;
      const { element } = this.sectionElements[i];
      const { slug } = this.sectionElements[prior];
      if (element.getBoundingClientRect().top >= 0) {
        this.setState({ activeSectionSlug: slug });
        break;
      }
    }
  }
  render() {
    return (
      <div>
        <Nav sections={sections} activeSectionSlug={this.state.activeSectionSlug} />
        <div className='stage'>
          {
            sections.map(({ Section, slug }) => (
              <div id={slug} key={slug}>
                <Section title={'foo'} />
              </div>
            ))
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
