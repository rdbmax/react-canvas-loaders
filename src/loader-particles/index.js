import times from 'lodash/times'

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import requestAnimationFrame from '../utils/get-request-anim-frame'

class LoaderParticles extends PureComponent {

  componentDidMount() {
    const {
      colorParticles,
      loaderSize,
      particleSize,
      particlesQuantity,
      loaderVelocity
    } = this.props

    function getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i += 1) color += letters[Math.floor(Math.random() * 16)]
      return color
    }

    const canvas = this.canvasRef
    const ctx = canvas.getContext('2d')
    canvas.width = loaderSize || 200
    canvas.height = loaderSize || 200

    function Particle(xDif, yDif, rayon, dateDif, color) {
      this.radius = particleSize || 5
      this.rayon = rayon
      this.color = colorParticles || color
      // si vous pouvez nous laisser vivre notre vie d'amour en paix
      this.draw = function () {
        ctx.fillStyle = this.color
        ctx.beginPath()
        const velocity = (loaderVelocity && loaderVelocity <= 10 && loaderVelocity > 0) ?
          (10 - (loaderVelocity * 0.8) - 1) * 100 :
          500
        const time = (Date.now() / velocity) + dateDif
        const x = (canvas.width / 2) + ((rayon + xDif) * Math.cos(time))
        const y = (canvas.height / 2) + ((rayon + yDif) * Math.sin(time))
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
      }
    }

    const particles = times(particlesQuantity || 50).map((number) => {
      const xDif = (Math.random() - 0.5) * 20
      const yDif = (Math.random() - 0.5) * 20
      const rayon = (Math.random() * 10) + (canvas.width / 4)
      const dateDif = (Math.random() * number * 100)
      const color = getRandomColor()

      return new Particle(xDif, yDif, rayon, dateDif, color)
    })

    const paintCanvas = () => particles.forEach(part => part.draw())

    function animloop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      paintCanvas()
      requestAnimationFrame(animloop)
    }

    animloop()
  }

  render() {
    return (
      <div className='loader-container loader-particles'>
        <canvas id='canvas-Loader-particles' ref={ (ref) => { this.canvasRef = ref } } />
      </div>
    )
  }
}

LoaderParticles.propTypes = {
  colorParticles: PropTypes.string,
  loaderSize: PropTypes.number,
  particleSize: PropTypes.number,
  particlesQuantity: PropTypes.number,
  loaderVelocity: PropTypes.number
}

export default LoaderParticles
