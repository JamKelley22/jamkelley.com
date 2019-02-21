import React from 'react'

import { ModelViewer } from '../../components'

import './assets.scss'

let models = [
  {
    modelURI: 'http://127.0.0.1:8000/box.glb'
  },
  {
    modelURI: 'http://127.0.0.1:8000/AntiqueCamera.glb'
  }
]

class Assets extends React.Component {
  render () {
    return (
      <div id='assetsPage'>
        {
          models.map((model,i) =>
            <ModelViewer
              key={i}
              modelURI={model.modelURI}
            />
          )
        }
      </div>
    )
  }
}

export default Assets;
