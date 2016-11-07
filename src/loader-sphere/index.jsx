/* eslint no-undef: 0 */
import { times } from 'lodash'
import React, { PureComponent, PropTypes } from 'react'

import { Scene, PerspectiveCamera, Sprite, WebGLRenderer } from 'three'

import SpriteCanvasMaterial from '../utils/SpriteCanvasMaterial'

class LoaderSphere extends PureComponent {
  camera = null
  mesh = null
  renderer = null
  scene = null

  particles = times(1000)

  componentDidMount() {
    const { loaderWidth, loaderHeight } = this.props

    this.camera = new PerspectiveCamera(70, loaderWidth / loaderHeight, 1, 1000)
    this.camera.position.z = 400
    this.scene = new Scene()

    // const geometry = new BoxBufferGeometry(200, 200, 200)

    // this.mesh = new Mesh(geometry)
    // this.scene.add(this.mesh)


    // particles
    const PI2 = Math.PI * 2
    const material = new SpriteCanvasMaterial({
      color: 0xffffff,
      program: (context) => {
        context.beginPath()
        context.arc(0, 0, 0.5, 0, PI2, true)
        context.fill()
      }
    })

    this.particles = this.particles.map(() => {
      const particle = new Sprite(material)
      particle.position.x = (Math.random() * 2) - 1
      particle.position.y = (Math.random() * 2) - 1
      particle.position.z = (Math.random() * 2) - 1
      particle.position.normalize()
      particle.position.multiplyScalar((Math.random() * 10) + 450)
      particle.scale.multiplyScalar(2)
      this.scene.add(particle)
      return particle
    })

    this.renderer = new WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(loaderWidth, loaderHeight)
    this.containerRef.appendChild(this.renderer.domElement)

    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        (callback => window.setTimeout(callback, 1000 / 60))
    })()

    this.animate()
  }

  animate = () => {
    window.requestAnimFrame(this.animate)
    // this.mesh.rotation.x += 0.005
    // this.mesh.rotation.y += 0.01
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    console.log('three', SpriteCanvasMaterial)
    return (
      <div className='loader-container loader-sphere' ref={ (ref) => { this.containerRef = ref } } />
    )
  }
}

LoaderSphere.propTypes = {
  loaderWidth: PropTypes.number,
  loaderHeight: PropTypes.number
}

export default LoaderSphere
