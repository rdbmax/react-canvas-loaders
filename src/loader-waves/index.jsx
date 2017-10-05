import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import requestAnimationFrame from '../utils/get-request-anim-frame'
import Osc from './Osc'

class LoaderWaves extends PureComponent {

  constructor(props) {
    super(props)

    this.count = 40
    const buffer = new ArrayBuffer(this.count * 4)
    this.points = new Float32Array(buffer)
    this.waveColor = props.waveColor || 'black'
    this.borderColor = props.borderColor || 'black'
    this.borderSize = props.borderSize || 10
    this.canvasWidth = props.size || 300
    this.canvasHeight = props.size || 300
    this.step = Math.ceil(this.canvasWidth / this.count)
    const osc1Max = (this.canvasHeight * (props.waveSize || 0.2)) / 2
    this.osc1 = new Osc(osc1Max)
    this.horizon = this.canvasHeight * 0.5
  }

  componentDidMount() {
    const canvas = this.canvasRef
    const ctx = canvas.getContext('2d')

    canvas.width = this.canvasWidth
    canvas.height = this.canvasHeight

    const fill = () => {
      for (let i = 0; i < this.count; i += 1) {
        this.points[i] = this.osc1.amp + this.horizon
      }
    }
    fill()

    // clip
    ctx.strokeStyle = this.borderColor || 'black'
    ctx.lineWidth = this.borderSize
    ctx.beginPath()
    ctx.arc(
      canvas.width / 2, canvas.height / 2, // center of circle
      (canvas.height / 2) - (this.borderSize / 2), // rayon
      0, Math.PI * 2, false
    )
    ctx.stroke()
    ctx.clip()

    this.animloop()
  }

  animloop = () => {
    const { width, height } = this.canvasRef
    const ctx = this.canvasRef.getContext('2d')

    let i
    // move points to the left
    for (i = 0; i < this.count - 1; i += 1) {
      this.points[i] = this.points[i + 1]
    }

    // get a new point
    this.points[this.count - 1] = this.osc1.amp + this.horizon // mixer(osc1, osc2, osc3)

    ctx.clearRect(0, 0, width, height)

    // render wave
    ctx.fillStyle = this.waveColor
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(0, this.points[0])
    for (i = 1; i < this.count; i += 1) {
      ctx.lineTo(i * this.step, this.points[i])
    }
    ctx.lineTo(this.count * this.step, height)
    ctx.lineTo(0, height)
    ctx.lineTo(0, this.points[0])
    ctx.closePath()
    ctx.fill()

    requestAnimationFrame(this.animloop)
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
