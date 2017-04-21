import * as THREE from 'three'
import Display from 'display/display'
import factory from 'assets/images/factory.jpg'
import lightCircle from 'utils/lights'
import FogScene from 'core/FogScene'

export default class World {
  constructor(container) {
    this.app = new Display({
      clearColor: 'rgb(40, 40, 40)',
      container,
    })
  }

  init() {
    this
      ._setupRenderer()
      ._setupFog()
      ._loadTextures()
  }

  _setupRenderer() {
    const { renderer } = this.app

    renderer.gammaFactor = 2.2
    renderer.gammaOutput = false
    renderer.gammaInput = false
    renderer.sortObjects = false

    return this
  }

  _setupFog() {
    const { scene, events } = this.app
    const fog = new FogScene(this.app)
    scene.add(fog)
    events.render.add(fog.update)

    return this
  }

  _setupLights() {
    const { scene } = this.app

    this.pointLights = lightCircle(['#fff', '#ff00ff', '#ff0000'], scene, true)
    return this
  }

  _loadTextures() {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(factory, this._setCube)

    return this
  }

  _setCube = () => {
    const { scene, events } = this.app

    const geometry = new THREE.BoxGeometry(1, 1, 1)

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissiveIntensity: 0.3,
      shading: THREE.FlatShading,
      shininess: 40,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
    })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const rotate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    }

    events.render.add(rotate)
  }

}