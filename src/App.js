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
	Accolades,
	Assets,
	Downloads,
	Error404
} from './pages'

import { history, routes } from './routing'

import { CombinedContextProvider, ThemeConsumer } from './context'

import './App.scss';

library.add(
  faCheck,faBan,faEdit,faTrash,faPlusCircle,
  faEyeSlash,faEye,faCaretRight,faCaretDown
)

class App extends Component {
  render() {

    return (
      <CombinedContextProvider>
        <div className='app'>
          <Backround/>
          <div className='content'>
            <Router history={history}>
              <Switch>
                <Route exact path={routes._CONSTRUCTION} component={() => <Construction/>} />
                <Route exact path={routes._LANDING} component={() => <Landing/>} />
                <Route exact path={routes._CONTACT} component={() => <Construction/>} />
                <Route exact path={routes._PROJECTS} component={() => <Construction/>} />
                <Route exact path={routes._RESUME} component={() => <Construction/>} />
                <Route exact path={routes._DOWNLOADS} component={() => <Downloads/>} />

                <Route exact path={routes._ASSETS} component={() => <Assets/>} />
                <Route exact path={routes._ACCOLADES} component={() => <Accolades/>} />
                <Route component={() => <Error404/>} />
              </Switch>
            </Router>
          </div>
        </div>
      </CombinedContextProvider>
    );
  }
}

export default App;

const Construction = () => (
  <div id='constructionPage'>
    <p>This website is under construction, please visit my <a href='https://archive.jamkelley.com'>Archive</a> instead</p>
    <h2>Important Links</h2>
    <h5>Website Preview</h5>
    <NavLink to={routes._LANDING}>Landing</NavLink><br/>
    <h5>Other projects I've worked on</h5>
    <ul>
      <li><a href="http://ratepoint.jamkelley.com/">RatePoint</a> | <a href="https://www.youtube.com/watch?v=6Fep0ocAJOc&t=343s">Demo Video</a></li>
      <li><a href="https://helptrain.space/">HelpTrain</a></li>
      <li><a href="https://coolslice-spass.herokuapp.com/">S-PASS</a></li>
      <li><a href="https://github.com/JamKelley22/Pentachoron">Pentachoron</a></li>
      <li><a href="https://bankeybags.com/">Bankey Bags</a></li>
      <li><a href="https://alarm.jamkelley.com/">Alarm.me</a></li>
      <li><a href="https://github.com/samstifter/punchclock">PunchClock</a></li>
      <li><a href="https://software.intel.com/en-us/ultimate-coder-vr/team4">VR Sprayer Sim</a></li>
      <li><a href="https://github.com/JamKelley22/Quizzer">Quizzer</a></li>
      <li>Game Jams
        <ul>
          <li><a href="https://globalgamejam.org/2019/games/wind-0">Spring 2019 - On the Wind</a> | <a href="https://github.com/JamKelley22/OnTheWind">GitHub</a></li>
          <li><a href="https://jamkelley22.itch.io/eternal-vapor">Fall 2018 - Eternal Vapor</a> | <a href="https://github.com/JamKelley22/eternal-vapor">Github</a></li>
          <li><a href="https://globalgamejam.org/2018/games/patient-zero-10">Spring 2018 - Patient Zero</a> | <a href="https://github.com/JamKelley22/GlobalGameJam2018">GitHub</a></li>
          <li><a href="https://globalgamejam.org/2017/games/kfzoo">Spring 2017 - KFZoo</a> | <a href="https://github.com/JamKelley22/Game_Jam_Spring_2017">GitHub</a></li>
        </ul>
      </li>
      <li>Game Clones
        <ul>
          <li><a href="https://github.com/JamKelley22/Minesweeper_X">MinesweeperX</a></li>
          <li><a href="https://github.com/JamKelley22/Tic-Tac-Toe-JavaFX">Tic-Tac-ToeFX</a></li>
        </ul>
      </li>
    </ul>
    <h5>Download links for previous projects</h5>
    <NavLink to={routes._DOWNLOADS}>Downloads</NavLink>
    <h5>Writing</h5>
    <a href="https://github.com/JamKelley22/accessible-design.jamkelley.com/blob/master/docs/Web%20Design%20with%20Accessibility%20in%20Mind.pdf">Web Design with Accessibility in Mind</a>
    <h5>Talks</h5>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=2UXV6aRiF5I">Unity Networking Workshop</a></li>
    </ul>
    <h5>Awards</h5>
    <a href="https://software.intel.com/en-us/ultimate-coder-vr/team4">Intel Ultimate Coder Challenge Winner</a>
    <h3>Social Links</h3>
    <ul>
      <li><a href="https://twitter.com/JameelKelley">Twitter</a></li>
      <li><a href="https://www.instagram.com/jamkelley22/">Instagram</a></li>
      <li><a href="https://github.com/JamKelley22">GitHub</a></li>
      <li><a href="https://stackoverflow.com/">StackOverflow</a></li>
      <li><a href="https://www.linkedin.com/in/jamkelley22/">LinkedIn</a></li>
      <li><a href="https://dev.to/jamkelley22">Dev.to</a></li>
      <li><a href="https://www.youtube.com/channel/UCS-n7QNji8ZBA6SctaKFr5A">Youtube</a></li>
    </ul>

  </div>
)

const Backround = (props) => {
  return (
    <ThemeConsumer>
      {themeObj =>
        <div className='background' style={themeObj.theme.base}/>
      }
    </ThemeConsumer>
  )
}
