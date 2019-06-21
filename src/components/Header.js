import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/header.css';

export default function Header() {
  return <div className='header_container'>
    <div className='app_container header_nav_container'>
      <NavLink exact to='/' className='nav_link' activeClassName='active_link'>Home</NavLink>
      <NavLink to='/about' className='nav_link' activeClassName='active_link'>About</NavLink>
    </div>
  </div>;
};
