import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Router from './Router';
const Navigation=(props)=><nav className="navbar navbar-inverse">
<ul className="nav navbar-nav">
<li><NavLink to='/'>Home </NavLink></li>
<li><NavLink to='/cart'>Cart </NavLink></li>

</ul>
  </nav>

class App extends Component {
  render() {
    return <div className="page-container">
      <Navigation />
      <Router />
   </div>
 }
}

export default App;
