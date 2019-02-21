import React from 'react'

import { ChatBot, GitHub, Video, Settings, ModelViewer } from '../../components'
import { Button } from '../../util'
import { ThemeConsumer } from '../../context'

import './landing.scss'

const Landing = (props) => {
  return (
    <ThemeConsumer>
      {themeObj =>
        <div className='landingPage' style={themeObj.theme.base}>
          <h1>Landing</h1>

          <hr/>
          <Button/>

          <hr/>

          <Settings/>

          <hr/>

          <ChatBot/>

          <div style={{width: '300px'}}>
            <Video src='6Fep0ocAJOc'/>
          </div>

          <hr/>

          <GitHub/>
        </div>
      }
    </ThemeConsumer>
  )
}

export default Landing;
//https://gltf-wybxbxlfnl.now.sh/T/coffee_cup.gltf
