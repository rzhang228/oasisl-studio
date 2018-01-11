const chokidar = require('chokidar')
const electron = require('electron-connect').server.create()

electron.start()

const mainWatcher = chokidar.watch('./dist/main')

mainWatcher.on('change', () => {
  setTimeout(() => {
    electron.restart()
  }, 0)
})

const rendererWatcher = chokidar.watch('./dist/renderer')

rendererWatcher.on('change', () => {
  electron.reload()
})