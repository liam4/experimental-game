module.exports = class Player {
  constructor(world, io) {
    this.world = world
    this.x = 0
    this.y = 0
    this.s = 4
    this.io = io
    this.controlDirection = []

    this.io.on('controls', (direction) => {
      this.controlDirection.push(direction.toString())
    })
  }

  tick() {
    if (this.controlDirection.includes('up')) {
      this.y += this.s
    }
    if (this.controlDirection.includes('down')) {
      this.y -= this.s
    }
    if (this.controlDirection.includes('left')) {
      this.x -= this.s
    }
    if (this.controlDirection.includes('right')) {
      this.x += this.s
    }

    this.controlDirection = []

    this.world.io.emit('position', {x: this.x, y: this.y})
  }
}
