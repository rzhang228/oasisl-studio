const chokidar = require('chokidar')
const electron = require('electron-connect').server.create()

const mainWatcher = chokidar.watch('./src', {
  ignored: './src/renderer'
})

electron.start()

mainWatcher.on('change', () => {
  electron.restart()
})

const rendererWatcher = chokidar.watch('./dist')

rendererWatcher.on('change', () => {
  electron.reload()
})