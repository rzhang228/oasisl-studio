const { ipcMain, dialog } = require('electron')
const path = require('path')
const os = require('os')
const fs = require('fs')

const desktopPath = path.join(os.homedir(), 'Desktop')

ipcMain.on('open-file', async (event) => {
  let filePaths = await dialog.showOpenDialog({
    title: '选择文件',
    defaultPath: desktopPath,
    properties: ['openFile']
  })
  event.sender.send('receive-file', fs.readFileSync(filePaths[0]).toString())
})

ipcMain.on('open-dir', async (event) => {
  let ret = {
    name: '',
    path: '',
    stats: {},
    children: []
  }, dir, dirContent
  dir = await dialog.showOpenDialog({
    title: '选择文件夹',
    defaultPath: desktopPath,
    properties: ['openDirectory']
  })
  dirContent = fs.readdirSync(dir[0])
  for (let file of dirContent) {
    let stats = fs.statSync(path.join(dir[0], file))
    ret.children.push({
      name: file,
      path: path.join(dir[0], file),
      stats,
      children: []
    })
  }
  let pathArr = dir[0].split('\\')
  ret.name = pathArr[pathArr.length - 1]
  ret.path = dir[0]
  ret.stats = fs.statSync(dir[0])
  event.sender.send('receive-dir', ret)
})