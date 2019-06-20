import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Article from './Article';

import '../styles/router.css';

export default function Router() {
  return <BrowserRouter>
    <header>
      <NavLink exact to='/' className='nav_link' activeClassName='active_link'>Home</NavLink>
      <NavLink to='/about' className='nav_link' activeClassName='active_link'>About</NavLink>
    </header>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/about' component={About}/>
      <Route path='/article' component={Article}/>
      <Redirect to='/'/>
    </Switch>
    <footer></footer>
  </BrowserRouter>;
};