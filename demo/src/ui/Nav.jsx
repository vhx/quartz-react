import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../index.js';

const NavLink = ({ children }) => (
  <li>
    <a href={`/#${children}`} className='text--gray block'>{children}</a>
  </li>
);

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
};


const sections = [
  'Buttons',
  'Checkboxes',
  'Icons',
  'Inputs',
];


const Nav = () => (
  <nav className='nav-primary'>
    <h1 className='head-4 head--teal text-left padding-top-medium'>
      <Icon name='vhx' color='navy' size='xlarge' className='margin-right-small'>VHX</Icon>
      <span>Quartz</span>
    </h1>
    <h2 className='head-5 head--gray margin-top-large padding-bottom-medium'>Components</h2>
    <ul className='no-bullet'>
      { sections.map(section => <NavLink key={section}>{section}</NavLink>) }
    </ul>
  </nav>
);

export default Nav;
