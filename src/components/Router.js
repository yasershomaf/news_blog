import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Article from './Article';
import Header from './Header';
import Footer from './Footer';

import '../styles/router.css';

export default function Router() {
  return <BrowserRouter>
    <Header />
    <div className='app_container'>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route path='/article' component={Article}/>
        <Redirect to='/'/>
      </Switch>
    </div>
    <Footer />
  </BrowserRouter>;
};