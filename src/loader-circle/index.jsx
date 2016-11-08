/* eslint no-undef: 0 */
import times from 'lodash/times'

import React, { PropTypes, PureComponent } from 'react'

import Eclipse from './Eclipse'

class LoaderCircles extends PureComponent {

  componentDidMount() {
    const { colorCircles, circlesQuantity, loaderSize } = this.props

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

    canvas.width = loaderSize || 100
    canvas.height = loaderSize || 100

    const definitiveColorCircles = colorCircles || 'rgba(0, 0, 0, 0.5)'

    const eclipsesQuantity = circlesQuantity || 3
    this.eclipses = times(eclipsesQuantity).map(id =>
      new Eclipse({
        ctx,
        canvas,
        angle: ((180 / eclipsesQuantity) * id),
        color: definitiveColorCircles
      }))

    this.animloop()
  }

  animloop = () => {
    const { width, height } = this.canvasRef
    const ctx = this.canvasRef.getContext('2d')

    ctx.clearRect(0, 0, width, height)
    this.eclipses.forEach(eclipse => eclipse.draw())
    requestAnimFrame(this.animloop)
  }

  render() {
    return (
      <div className='loader-container loader-circles'>
        <canvas id='canvas-Loader-circles' ref={ (ref) => { this.canvasRef = ref } } />
      </div>
    )
  }
}

LoaderCircles.propTypes = {
  colorCircles: PropTypes.string,
  circlesQuantity: PropTypes.number,
  loaderSize: PropTypes.number
}

export default LoaderCircles
