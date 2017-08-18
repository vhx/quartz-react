import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../index.js';

const NavLink = ({ slug, title }) => (
  <li>
    <a href={`/#${slug}`} className='text--gray block'>{title}</a>
  </li>
);

NavLink.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};


const Nav = ({ sections }) => (
  <nav className='nav-primary'>
    <h1 className='head-4 head--teal text-left padding-top-medium'>
      <Icon name='vhx' size='xlarge' className='margin-right-small'>VHX</Icon>
      <span>Quartz</span>
    </h1>
    <h2 className='head-5 head--gray margin-top-large padding-bottom-medium'>Components</h2>
    <ul className='no-bullet'>
      { sections.map(({ slug, title }) => <NavLink key={slug} title={title} slug={slug} />) }
    </ul>
  </nav>
);

Nav.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    Section: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Nav;
