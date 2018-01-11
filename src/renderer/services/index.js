const { EventEmitter } = require('events')
const { ipcRenderer } = require('electron')

const service = new EventEmitter()

service.on('open-file', (cb) => {
  ipcRenderer.send('open-file')
  ipcRenderer.once('open-file-reply', (event, file) => {
    cb(event, file)
  })
})

service.on('open-dir', (cb) => {
  ipcRenderer.send('open-dir')
  ipcRenderer.once('open-dir-reply', (event, fileObj) => {
    cb(event, fileObj)
  })
})

service.on('create-previewHTML', (html, cb) => {
  ipcRenderer.send('create-previewHTML', html)
  ipcRenderer.once('create-previewHTML-reply', (event, path) => {
    cb(path)
  })
})

export default {
  on(name, cb) {
    service.on(name, cb)
  },

  once(name, cb) {
    service.once(name, cb)
  },

  trigger(name, ...args) {
    service.emit(name, ...args)
  }
}
