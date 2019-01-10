import React, { Component } from 'react'
import { Router } from "react-router-dom"
import { Switch, Route } from 'react-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,faBan,faEdit,faTrash,faPlusCircle,
  faEyeSlash,faEye,faCaretRight,faCaretDown
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

import {
  Landing,
  Downloads,
  Error404
} from './pages'

import Test from './test.js'

import { history, routes } from './routing'

import './App.module.scss';

library.add(
  faCheck,faBan,faEdit,faTrash,faPlusCircle,
  faEyeSlash,faEye,faCaretRight,faCaretDown
)

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path={routes._CONSTRUCTION} component={() => <Construction/>} />
            <Route exact path={routes._LANDING} component={() => <Landing/>} />
            <Route exact path={routes._CONTACT} component={() => <Construction/>} />
            <Route exact path={routes._PROJECTS} component={() => <Construction/>} />
            <Route exact path={routes._RESUME} component={() => <Construction/>} />
			<Route exact path={routes._DOWNLOADS} component={() => <Downloads/>} />
            <Route component={() => <Error404/>} />
          </Switch>
        </Router>
        <Test/>
      </div>
    );
  }
}

export default App;

const Construction = () => (
  <div>
    <p>This website is under construction, visit my <a href='https://archive.jamkelley.com'>Archive</a> insted</p>
    <NavLink to={routes._LANDING}>Landing</NavLink><br/>
	<NavLink to={routes._DOWNLOADS}>Downloads</NavLink>
  </div>
)
