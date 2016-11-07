/* eslint no-undef: 0 */

// import times from 'lodash/times'

// import React, { PropTypes, PureComponent } from 'react'
import React, { PureComponent } from 'react'

class LoaderCircle extends PureComponent {

  componentDidMount() {
    // const {
    //   colorParticles,
    //   loaderSize,
    //   particleSize,
    //   particlesQuantity,
    //   loaderVelocity
    // } = this.props

    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        (callback => window.setTimeout(callback, 1000 / 60))
    })()

    const canvas = this.canvasRef
    const ctx = canvas.getContext('2d')
    canvas.width = 200
    canvas.height = 200

    class Eclipse {
      constructor(start) {
        this.center = { x: canvas.width / 2, y: canvas.height / 2 }
        this.angle = { start, end: 2 }
        this.anticlockwise = 2 * Math.PI
        this.ctx = ctx

        this.majorRadiusDirection = true
        this.minorRadiusDirection = true

        this.radius = {
          major: {
            value: canvas.height / 2,
            direction: true,
            max: canvas.height / 2,
            min: (canvas.height / 2) / 3
          },
          minor: {
            value: (canvas.height / 2) / 2,
            direction: true,
            max: canvas.height / 2,
            min: (canvas.height / 2) / 3
          }
        }
      }

      getNewRadius(radius) {
        if (
          (this.radius[radius].value >= this.radius[radius].max) ||
          (this.radius[radius].value <= this.radius[radius].min)
        ) { this.radius[radius].direction = !this.radius[radius].direction }

        return (this.radius[radius].direction) ?
          (this.radius[radius].value + 1) : (this.radius[radius].value - 1)
      }

      getComputedAngle() {
        if (this.angle.start >= 180) {
          this.angle.start = 1
        } else {
          this.angle.start += 5
        }

        return { start: (this.angle.start * Math.PI) / 180, end: 0 }
      }

      draw() {
        // Update Radius
        this.radius.major.value = this.getNewRadius('major')
        this.radius.minor.value = this.getNewRadius('minor')

        // Update angle
        const angle = this.getComputedAngle()

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.beginPath()
        ctx.ellipse(
          this.center.x, this.center.y, // center
          this.radius.major.value, this.radius.minor.value, // radius
          angle.start, angle.end, // angle
          2 * Math.PI
        )
        ctx.fill()
      }
    }

    const eclipse1 = new Eclipse(0)
    const eclipse2 = new Eclipse(90)

    function animloop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      eclipse1.draw()
      eclipse2.draw()
      requestAnimFrame(animloop)
    }

    animloop()

    // function Particle(xDif, yDif, rayon, dateDif, color) {
    //   this.radius = particleSize || 5
    //   this.rayon = rayon
    //   this.color = colorParticles || color
    //   // si vous pouvez nous laisser vivre notre vie d'amour en paix
    //   this.draw = function () {
    //     ctx.fillStyle = this.color
    //     ctx.beginPath()
    //     const velocity = (loaderVelocity && loaderVelocity <= 10 && loaderVelocity > 0) ?
    //       (10 - (loaderVelocity * 0.8) - 1) * 100 :
    //       500
    //     const time = (Date.now() / velocity) + dateDif
    //     const x = (canvas.width / 2) + ((rayon + xDif) * Math.cos(time))
    //     const y = (canvas.height / 2) + ((rayon + yDif) * Math.sin(time))
    //     ctx.arc(x, y, this.radius, 0, Math.PI * 2, false)
    //     ctx.fill()
    //   }
    // }

    // const particles = times(particlesQuantity || 50).map((number) => {
    //   const xDif = (Math.random() - 0.5) * 20
    //   const yDif = (Math.random() - 0.5) * 20
    //   const rayon = (Math.random() * 10) + (canvas.width / 4)
    //   const dateDif = (Math.random() * number * 100)
    //   const color = getRandomColor()

    //   return new Particle(xDif, yDif, rayon, dateDif, color)
    // })

    // const paintCanvas = () => particles.forEach(part => part.draw())

    // function animloop() {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height)
    //   paintCanvas()
    //   requestAnimFrame(animloop)
    // }

    // animloop()
  }

  render() {
    return (
      <div className='loader-container loader-particles'>
        <canvas id='canvas-Loader-particles' ref={ (ref) => { this.canvasRef = ref } } />
      </div>
    )
  }
}

// LoaderParticles.propTypes = {
//   colorParticles: PropTypes.string,
//   loaderSize: PropTypes.number,
//   particleSize: PropTypes.number,
//   particlesQuantity: PropTypes.number,
//   loaderVelocity: PropTypes.number
// }

export default LoaderCircle
