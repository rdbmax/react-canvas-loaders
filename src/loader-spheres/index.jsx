/* eslint no-undef: 0 */
import { times } from 'lodash'
import React, { PureComponent, PropTypes } from 'react'

import { Scene, PerspectiveCamera, Sprite } from 'three'
import { SpriteCanvasMaterial, CanvasRenderer } from '../utils/CanvasRenderer'

import requestAnimationFrame from '../utils/get-request-anim-frame'

class LoaderSphere extends PureComponent {
  camera = null
  mesh = null
  renderer = null
  scene = null

  particles = times(1000)

  componentDidMount() {
    const { loaderWidth, loaderHeight } = this.props

    this.camera = new PerspectiveCamera(70, loaderWidth / loaderHeight, 1, 1000)
    this.camera.position.z = 1000
    this.scene = new Scene()

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

    this.renderer = new CanvasRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(loaderWidth, loaderHeight)
    this.containerRef.appendChild(this.renderer.domElement)

    this.animate()
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }

  render() {
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
