import React, { Component } from 'react'
import { Router, Link } from "react-router-dom"
import { Switch, Route } from 'react-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,faBan,faEdit,faTrash,faPlusCircle,
  faEyeSlash,faEye,faCaretRight,faCaretDown
} from '@fortawesome/free-solid-svg-icons'
import {
  Landing,
  Error404
} from './components'

import { history, routes } from './routing'

import './App.module.scss';

library.add(
  faCheck,faBan,faEdit,faTrash,faPlusCircle,
  faEyeSlash,faEye,faCaretRight,faCaretDown
)

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path={routes._LANDING} component={() => <Landing/>} />
            <Route exact path={routes._CONTACT} component={() => <Construction/>} />
            <Route exact path={routes._PROJECTS} component={() => <Construction/>} />
            <Route exact path={routes._RESUME} component={() => <Construction/>} />
            <Route component={() => <Error404/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

const Construction = () => (
  <p>This website is under construction, visit my <a href='https://archive.jamkelley.com'>Archive</a> insted</p>
)
