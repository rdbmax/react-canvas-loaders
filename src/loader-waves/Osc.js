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

export default Osc
