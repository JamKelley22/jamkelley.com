import React from 'react';
import GLTFLoader from 'three-gltf-loader';

import './modelViewer.scss'

const THREE = window.THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

let max = .6;
let min = .4;

class ModelViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      mouseDown: false,
      modelLoaded: false,
      settingsOpen: false,
      lightingValue: 7,
      error: false
    }
    this._renderer = null;
    this._scene = null;
    this._camera = null;
    this._controls = null;
    this._obj = null;
    this._light = null;

    this._clock = new THREE.Clock();
    this._speed = Math.random() * (max - min) + min;
    this._delta = 0;
  }

  componentDidMount() {
    this.init();
    this.update();
  }

  init = () => {
  	let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 50 );
  	camera.position.set( - 1.8, 5, 15 );
  	let controls = new OrbitControls(camera);//new THREE.OrbitControls( camera );
  	controls.target.set( 0, - 0.2, - 0.2 );
    controls.enabled = false;
  	controls.update();
  	//var urls = [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ];
  	//var loader = new THREE.CubeTextureLoader().setPath( 'textures/cube/Bridge2/' );
  	//var background = loader.load( urls );

  	let scene = new THREE.Scene();
  	//scene.background = background;

  	let light;
    light = new THREE.AmbientLight( 0x404040, this.state.lightingValue );
  	//light.position.set( 100, 100, 100 );
  	scene.add( light);

    const loader = new GLTFLoader();
    loader.load( this.props.modelURI, ( gltf ) => {
  		gltf.scene.traverse( function ( child ) {
  			//if ( child.isMesh ) {
  			//	child.material.envMap = background;
  			//}
  		} );
      this.setState({
        modelLoaded: true
      })
  		scene.add( gltf.scene );
      this._obj = gltf.scene;
  	}, undefined, ( e ) => {
  		console.error( e );
      this.setState({
        error: true
      })
  	} );
    const ctx = this.refs.canvas.getContext('webgl');
  	let renderer = new THREE.WebGLRenderer( { antialias: true,canvas:ctx.canvas,context: ctx} );
  	renderer.setPixelRatio( window.devicePixelRatio );
  	renderer.setSize( 300, 300 );
  	renderer.gammaOutput = true;
    renderer.setClearColor('#FFFFFF')

    camera.aspect = 1;
    camera.updateProjectionMatrix();

    this._renderer = renderer;
    this._scene = scene;
    this._camera = camera;
    this._controls = controls;
    this._light = light;
  }

  update = () => {
  	requestAnimationFrame( this.update );
    this.renderModel();
    this.rotateModel();
  }

  renderModel = () => {
    if(this._renderer && this._scene && this._camera)
  	 this._renderer.render( this._scene, this._camera );
  }

  rotateModel = () => {
    this._delta = this._clock.getDelta();
    if(this._obj && !this.state.hovering && !this.state.mouseDown) {
      this._obj.rotation.y += this._speed * this._delta;
    }
  }

  toggleHover = (toggleVal) => {
    if(this._controls) {
        this._controls.enabled = toggleVal;
    }
    this.setState({
      hovering: toggleVal
    })
  }

  toggleMouseDown = (toggleVal) => {
    this.setState({
      mouseDown: toggleVal
    })
  }

  toggleSettings = () => {
    this.setState({
      settingsOpen: !this.state.settingsOpen
    })
  }

  setLightIntensity = (intensity) => {
    if(!this._light)
      return;
    console.log(this._light.power);
    this._light.intensity = intensity;
    this.setState({
      lightingValue: intensity
    })
  }

  render () {
    return(
      <div id='viewer'>
        <canvas
        id='modelViewer'
          ref="canvas"
          onMouseEnter={() => this.toggleHover(true)}
          onMouseLeave={() => this.toggleHover(false)}
          onMouseDown={() => this.toggleMouseDown(true)}
          onMouseUp={() => this.toggleMouseDown(false)}
        />
        <div className='viewerOverlay' id='settingsPanal'>
          <button onClick={this.toggleSettings}>Q</button>
          <div id='allSettings' style={{display:`${this.state.settingsOpen == true ? 'block' : 'none'}`}}>
            <SettingAdjust
              onRight={() => this.setLightIntensity(Math.min(this.state.lightingValue+1,15))}
              onLeft={() => this.setLightIntensity(Math.max(this.state.lightingValue-1,0))}
              val={this.state.lightingValue}
            />
          </div>
        </div>

      {
        (this.state.error) ?
        <div className="modelLoadError viewerOverlay">
          Error
        </div>
        :
        <div
          className="lds-hourglass viewerOverlay"
          style={{display:`${this.state.modelLoaded == false ? 'block' : 'none'}`}}
        />
      }

      </div>
    );

  }
}

export default ModelViewer;

let left = "<"
let right = ">"
const SettingAdjust = (props) => (
  <div id='settingRow'>
    <button id='directionBtn' onClick={props.onLeft}>{left}</button>
    <button>{props.val}</button>
    <button id='directionBtn' onClick={props.onRight}>{right}</button>
  </div>
)
//Loading
//Zoom
//Download
//Adjust Lighting
