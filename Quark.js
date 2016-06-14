module.exports = class Quark {
  constructor(world, x, y, direction, speed) {
    this.world = world
    this.x = x
    this.y = y
    this.d = direction
    this.s = speed
  }

  tick() {
    this.x += Math.cos(this.d) * this.s
    this.y += Math.sin(this.d) * this.s

    if (this.world) {
      if (this.x < -0.5 * this.world.width) {
        this.x = 0.5 * this.world.width
      }
      if (this.y < -0.5 * this.world.height) {
        this.y = 0.5 * this.world.height
      }
      if (this.x > 0.5 * this.world.width) {
        this.x = -0.5 * this.world.width
      }
      if (this.y > 0.5 * this.world.height) {
        this.y = -0.5 * this.world.height
      }
    }
  }
}
