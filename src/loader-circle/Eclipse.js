class Eclipse {
  constructor({ ctx, canvas, angle, color }) {
    this.center = { x: canvas.width / 2, y: canvas.height / 2 }
    this.angle = { start: angle, end: 2 }
    this.anticlockwise = 2 * Math.PI
    this.ctx = ctx
    this.color = color

    this.majorRadiusDirection = true
    this.minorRadiusDirection = true

    this.test = 0

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

    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.ellipse(
      this.center.x, this.center.y, // center
      this.radius.major.value, this.radius.minor.value, // radius
      angle.start, angle.end, // angle
      2 * Math.PI
    )
    this.ctx.fill()
  }
}

export default Eclipse
