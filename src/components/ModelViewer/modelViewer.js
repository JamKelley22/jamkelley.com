import React from 'react'

import MODEL from './hand.obj';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
var loader = new THREE.GLTFLoader();
OBJLoader(THREE);

class ModelViewer extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    //scene.add(cube)
    renderer.setClearColor('#FFFFFF')
    renderer.setSize(width, height)

    // load a resource
    this.THREE = THREE;
    const objLoader = new this.THREE.OBJLoader();

    this.name = 'flower';

    objLoader.load(MODEL, (mesh)=>{
      scene.add(mesh);
      this.mesh = mesh
    });

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    if(this.mesh) {
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.01
    }


    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default ModelViewer;
