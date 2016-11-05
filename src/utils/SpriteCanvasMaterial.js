import { Material, Color } from 'three'

const SpriteCanvasMaterial = function (parameters) {
  Material.call(this)
  this.type = 'SpriteCanvasMaterial'
  this.color = new Color(0xffffff)
  this.program = function (context, color) {}
  this.setValues(parameters)
}

SpriteCanvasMaterial.prototype = Object.create(Material.prototype)
SpriteCanvasMaterial.prototype.constructor = SpriteCanvasMaterial

SpriteCanvasMaterial.prototype.clone = function () {
  const material = new SpriteCanvasMaterial()

  material.copy(this)
  material.color.copy(this.color)
  material.program = this.program

  return material
}

export default SpriteCanvasMaterial
