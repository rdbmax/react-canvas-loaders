/* eslint no-undef: 0 */
import React, { PropTypes, PureComponent } from 'react'

class Osc {
  constructor(theMax) {
    this.variation = 0.4
    this.theMax = theMax
    this.speed = 0.02

    this.a = 0
    this.max = this.maximum
  }

  get amp() {
    this.a += this.speed

    if (this.a >= 2.0) {
      this.a = 0
      this.max = this.maximum
    }
    return this.max * Math.sin(this.a * Math.PI)
  }

  get maximum() {
    return (Math.random() * this.theMax * this.variation) + (this.theMax * (1 - this.variation))
  }
}

class LoaderWaves extends PureComponent {

  componentDidMount() {
    const { waveColor, borderColor, borderSize, size, waveSize } = this.props

    const borderWidth = borderSize || 10
    const canvas = this.canvasRef
    const ctx = canvas.getContext('2d')
    canvas.width = size || 300
    canvas.height = size || 300
    const osc1Max = (canvas.height * (waveSize || 0.2)) / 2
    const osc1 = new Osc(osc1Max)
    const count = 40
    const step = Math.ceil(canvas.width / count)
    const buffer = new ArrayBuffer(count * 4)
    const points = new Float32Array(buffer)
    const horizon = canvas.height * 0.5

    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        (callback => window.setTimeout(callback, 1000 / 60))
    })()

    const fill = () => {
      for (let i = 0; i < count; i += 1) {
        points[i] = osc1.amp + horizon // mixer(osc1, osc2, osc3);
      }
    }
    fill()

    // clip
    ctx.strokeStyle = borderColor || 'black'
    ctx.lineWidth = borderWidth
    ctx.beginPath()
    ctx.arc(
      canvas.width / 2, canvas.height / 2, // center of circle
      (canvas.height / 2) - (borderWidth / 2), // rayon
      0, Math.PI * 2, false
    )
    ctx.stroke()
    ctx.clip()

    const loop = () => {
      let i

      // move points to the left
      for (i = 0; i < count - 1; i += 1) {
        points[i] = points[i + 1]
      }

      // get a new point
      points[count - 1] = osc1.amp + horizon // mixer(osc1, osc2, osc3)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // render wave
      ctx.fillStyle = waveColor || 'black'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, points[0])
      for (i = 1; i < count; i += 1) {
        ctx.lineTo(i * step, points[i])
      }
      ctx.lineTo(count * step, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.lineTo(0, points[0])
      ctx.closePath()
      ctx.fill()


      requestAnimationFrame(loop)
    }
    loop()
  }

  render() {
    return (
      <div className='loader-container loader-waves'>
        <canvas ref={ (ref) => { this.canvasRef = ref } } />
      </div>
    )
  }
}

LoaderWaves.propTypes = {
  waveColor: PropTypes.string,
  waveSize: PropTypes.number,
  borderColor: PropTypes.string,
  borderSize: PropTypes.number,
  size: PropTypes.number
}

export default LoaderWaves
