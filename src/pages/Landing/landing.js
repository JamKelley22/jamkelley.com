import React from 'react'

import { GitHub, Video } from '../../components'

import './landing.module.scss'

const Landing = (props) => {
  return (
    <div>
      <h1>Landing</h1>
      <div style={{width: '300px'}}>
        <Video src='6Fep0ocAJOc'/>
      </div>
      <GitHub/>
    </div>
  )
}

export default Landing;
