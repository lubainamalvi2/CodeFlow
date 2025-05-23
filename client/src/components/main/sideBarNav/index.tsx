import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import HoverToPlayTTSWrapper from '../../textToSpeech/textToSpeechComponent';

/**
 * The SideBarNav component has two menu items: "Questions" and "Tags".
 * It highlights the currently selected item based on the active page and
 * triggers corresponding functions when the menu items are clicked.
 */
const SideBarNav = () => (
  <div id='sideBarNav' className='sideBarNav'>
    <HoverToPlayTTSWrapper text='Questions' isOnRight={false}>
      <div className='navOption'>
        <NavLink
          to='/home'
          id='menu_questions'
          className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
          Questions
        </NavLink>
      </div>
    </HoverToPlayTTSWrapper>
    <HoverToPlayTTSWrapper text='Tags' isOnRight={false}>
      <div className='navOption'>
        <NavLink
          to='/tags'
          id='menu_tag'
          className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
          Tags
        </NavLink>
      </div>
    </HoverToPlayTTSWrapper>
  </div>
);

export default SideBarNav;
