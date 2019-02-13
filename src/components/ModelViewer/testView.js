import React, { Component } from 'react';
import GLTFLoader from 'three-gltf-loader';
const THREE = window.THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE)

const loader = new GLTFLoader();

class ThreeScene extends Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 10;
    this.camera.position.y = 2;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#FFFFFF')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    //new OrbitControls(this.camera)

    //ADD CUBE
    //const geometry = new THREE.BoxGeometry(1, 1, 1)
    //const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    //this.cube = new THREE.Mesh(geometry, material)
    //this.scene.add(this.cube)
    //loader.setResourcePath('https://gltf-fuvnbfybbs.now.sh/T');
    /*
    loader.load(
      this.props.modelURI,
      ( gltf ) => {
          // called when the resource is loaded
          this.cup = gltf;
          this.scene.add( gltf.scene );
      },
      ( xhr ) => {
          // called while loading is progressing
          console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
      },
      ( error ) => {
          // called when loading has errors
          console.error( 'An error happened', error );
      },

    );
  */

  this.load(this.props.modelURI)
    .catch((e) => console.error(e))
    .then((gltf) => {
      this.scene.add( gltf.scene || gltf.scenes[0]);
      console.log(gltf);
    });
    this.start()
  }

  load ( url ) {
    return new Promise((resolve, reject) => {

      const manager = new THREE.LoadingManager();

      const loader = new GLTFLoader(manager);
      loader.setCrossOrigin('anonymous');

      loader.load(url, (gltf) => {

        const scene = gltf.scene || gltf.scenes[0];
        const clips = gltf.animations || [];
        resolve(gltf);

      }, undefined, reject);

    });

  }

componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
  if(this.gltf)
    this.gltf.rotation.x += 0.01
   //this.cube.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
      <div
        style={{ width: '200px', height: '200px' }}
        ref={(mount) => { this.mount = mount }}
      >
      </div>
    )
  }
}
export default ThreeScene;
