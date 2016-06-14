'use strict'

// Number of milliseconds between each tick.
const TICK_RATE = 1000 / 120

// Port for socket server to use.
const PORT = 8080

const WORLD_SIZE = 7000
const INITIAL_PARTICLES = 6000

const path = require('path')
const World = require('./World')

function launchForever(fn, ms, runNow) {
  const tools = {afterTools: () => undefined}
  const next = () => {
    tools.startTime = new Date()
    fn()
    setTimeout(next, ms)
    tools.endTime = new Date()
    tools.tickTime = tools.endTime - tools.startTime
    tools.afterTools()
  }
  if (runNow) {
    next()
  } else {
    setImmediate(next)
  }
  return tools
}

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const world = new World()
world.width = WORLD_SIZE
world.height = WORLD_SIZE
world.io = io
world.spaghettiQuarks(INITIAL_PARTICLES, WORLD_SIZE)

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'))
})

io.on('connection', (socket) => {
  console.log('Hey!\x1b[K')
  const player = world.addPlayer(socket)

  socket.on('disconnect', () => {
    world.removePlayer(player)
  })
})

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  const forever = launchForever(() => {
    world.tick()
  }, 1000 / 120)

  forever.afterTools = () => {
    let msg = `Tick time: ${forever.tickTime}ms`
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(msg)
    process.stdout.write('\n\x1b[1A')
  }
})
