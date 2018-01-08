const { EventEmitter } = require('events')
const { ipcRenderer } = require('electron')

const event = new EventEmitter()

event.on('open-file', (cb) => {
  ipcRenderer.send('open-file')
  ipcRenderer.once('open-file-reply', (event, file) => {
    cb(event, file)
  })
})

event.on('open-dir', (cb) => {
  ipcRenderer.send('open-dir')
  ipcRenderer.once('open-dir-reply', (event, fileObj) => {
    cb(event, fileObj)
  })
})

export default {
  on(name, cb) {
    event.on(name, cb)
  },

  once(name, cb) {
    event.once(name, cb)
  },

  trigger(name, ...args) {
    event.emit(name, ...args)
  }
}