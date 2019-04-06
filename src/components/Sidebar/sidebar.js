import React from 'react'
import { NavLink } from 'react-router-dom'

import { history, routes } from '../../routing'

import { ThemeConsumer } from '../../context'
import { themes } from '../../design/constants.js'

class Sidebar extends React.Component {

  render () {
    return(
      <ThemeConsumer>
      {themeObj =>
        <div className='sidebarComponent'>
          <NavLink to={routes._LANDING}>Landing</NavLink>&nbsp;
          <NavLink to={routes._CONTACT}>Contact</NavLink>&nbsp;
          <NavLink to={routes._PROJECTS}>Projects</NavLink>&nbsp;
          <NavLink to={routes._RESUME}>Resume</NavLink>&nbsp;
          <NavLink to={routes._DOWNLOADS}>Downloads</NavLink>&nbsp;
          <NavLink to={routes._ACCOLADES}>Accolades</NavLink>&nbsp;
          <NavLink to={routes._ASSETS}>Assets</NavLink>&nbsp;
          <NavLink to={routes._BLOG}>Blog</NavLink>&nbsp;
          <NavLink to={routes._SETTINGS}>Settings</NavLink>&nbsp;
        </div>
      }
      </ThemeConsumer>
    )
  }
}

export default Sidebar;
