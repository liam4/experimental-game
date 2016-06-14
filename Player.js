'use strict'

module.exports = class Player {
  constructor(world, io) {
    this.world = world
    this.x = 0
    this.y = 0
    this.s = 4
    this.io = io
    this.controlDirection = {}

    this.io.on('controls', (direction) => {
      this.controlDirection[direction] = true
    })
  }

  tick() {
    if (this.controlDirection.up) {
      this.y += this.s
    }
    if (this.controlDirection.down) {
      this.y -= this.s
    }
    if (this.controlDirection.left) {
      this.x += this.s
    }
    if (this.controlDirection.right) {
      this.x -= this.s
    }

    this.controlDirection = []

    this.io.emit('position', {x: this.x, y: this.y})
  }
}
