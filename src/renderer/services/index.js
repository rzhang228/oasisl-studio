import { EventEmitter } from 'events'
import { ipcRenderer } from 'electron'

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

service.on('delete-file', (path) => {
  ipcRenderer.send('delete-file', path)
})

export default {
  trigger(name, ...args) {
    service.emit(name, ...args)
  }
}
