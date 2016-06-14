'use strict'

const Quark = require('./Quark')
const Player = require('./Player')

function degToRad(val) {
  return Math.PI / 180 * val
}

module.exports = class World {
  constructor() {
    this.quarks = []
    this.players = []
    this.ticks = 0
    this.width = 600
    this.height = 600
    this.io = null
  }

  tick() {
    this.ticks++
    for (let quark of this.quarks) {
      quark.tick()
    }
    for (let player of this.players) {
      player.tick()
    }

    const emitQuarks = []
    for (let quark of this.quarks) {
      emitQuarks.push({
        x: quark.x,
        y: quark.y
      })
    }
    this.io.emit('world quarks', emitQuarks)

    const emitPlayers = []
    for (let player of this.players) {
      emitPlayers.push({
        x: player.x,
        y: player.y
      })
    }
    this.io.emit('world players', emitPlayers)
  }

  addPlayer(socket) {
    const player = new Player(this, socket)
    this.players.push(player)
    return player
  }

  removePlayer(player) {
    for (let i = 0; i < this.players.length; i++) {
      if (player === this.players[i]) {
        this.players.splice(i, 1)
      }
    }
  }

  spaghettiQuarks(count = 20, spread = 100, moving = true) {
    for (let i = 0; i < count; i++) {
      const dir = (moving ? degToRad(Math.random() * 360) : 0)
      const speed = (moving ? Math.random() * 5 : 0)
      this.quarks.push(new Quark(this,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        dir, speed))
    }
  }
}
