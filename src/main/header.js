const path = require('path')
const os = require('os')
const fs = require('fs')
const { ipcMain, dialog } = require('electron')

const desktopPath = path.join(os.homedir(), 'Desktop')

ipcMain.on('open-file', async (event) => {
  const filePaths = await dialog.showOpenDialog({
    title: '选择文件',
    defaultPath: desktopPath,
    properties: ['openFile']
  })
  event.sender.send('open-file-reply', fs.readFileSync(filePaths[0]).toString())
})

ipcMain.on('open-dir', async (event) => {
  const ret = {
    name: '',
    path: '',
    stats: {},
    children: []
  }
  const dirList = await dialog.showOpenDialog({
    title: '选择文件夹',
    defaultPath: desktopPath,
    properties: ['openDirectory']
  })
  const [dir] = dirList
  const pathArr = dir.split('\\')
  const stats = fs.statSync(dir)
  ret.name = pathArr[pathArr.length - 1]
  ret.path = dir
  ret.stats = stats
  ret.isDirectory = stats.isDirectory()
  const dirContent = fs.readdirSync(dir)
  for (const file of dirContent) {
    const tempStats = fs.statSync(path.join(dir, file))
    ret.children.push({
      name: file,
      path: path.join(dir, file),
      stats: tempStats,
      isDirectory: tempStats.isDirectory(),
      children: []
    })
  }
  event.sender.send('open-dir-reply', ret)
})

ipcMain.on('create-previewHTML', (event, tempHtml) => {
  const html = tempHtml.replace(/\.\/oasisl/g, '../oasisl')
  const fileName = `${new Date().getTime()}.html`
  const filePath = `${process.cwd()}\\cache\\${fileName}`
  console.log(html)
  console.log(fileName)
  console.log(process.cwd())
  fs.writeFileSync(filePath, html)
  event.sender.send('create-previewHTML-reply', filePath)
})
