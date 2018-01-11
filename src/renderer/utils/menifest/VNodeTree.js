import VNode from './VNode'
import defaultHtml from './default.html'
import singleTagDom from './singleTagDom'

/**
 * 一个VNodeTree对应一个静态页
 * 
 * @class VNodeTree
 */
class VNodeTree {
  constructor(idNext, tree, map, title, unsaved = false) {
    this.idNext = idNext
    this.title = title
    this.path = ''
    this.unsaved = unsaved
    this.tree = tree
    this.map = map
  }

  /**
   * 使用默认模板创建一个新的VNodeTree对象
   * 
   * @memberof VNodeTree
   */
  static create() {
    return VNodeTree.parseHTML(defaultHtml)
  }

  /**
   * 解析html
   * 
   * @static
   * @param {any} html
   * @returns 
   * @memberof VNodeTree
   */
  static parseHTML(html) {
    const mainXml = document.createElement('html')
    mainXml.innerHTML = html

    let idCount = 0
    let title
    const nodeList = {}

    function convert(xml) {
      if (xml.nodeType !== 1 && !(xml.nodeType === 3 && xml.textContent.trim() !== ''))
        return null

      idCount += 1

      if (xml.nodeType === 3)
        return new VNode({
          id: idCount,
          type: 1,
          text: xml.textContent
        })

      const obj = {}
      obj.id = idCount
      obj.type = 1
      obj.tagName = xml.nodeName.toLowerCase()
      obj.attr = {}

      if (obj.tagName === 'title')
        title = xml.textContent

      for (let j = 0; j < xml.attributes.length; j += 1) {
        const attribute = xml.attributes.item(j)
        obj.attr[attribute.nodeName] = attribute.nodeValue
      }

      if (xml.childNodes.length > 0) {
        const items = []
        for (let i = 0; i < xml.childNodes.length; i += 1) {
          const node = xml.childNodes.item(i)
          const item = convert(node)
          if (item)
            items.push(item)
        }
        if (items.length > 0)
          obj.children = items
      }

      const vNode = new VNode(obj)

      nodeList[vNode.id] = vNode

      return vNode
    }

    const nodeTree = convert(mainXml)

    idCount += 1

    return new VNodeTree(idCount, nodeTree, nodeList, title, true)
  }

  /**
   * 解析json，返回VNodeTree，用于导入文件时读取menifest.json
   * 
   * @static
   * @param {any} json 
   * @returns 
   * @memberof VNodeTree
   */
  static parseJSON(data) {
    let mainJson = data
    if (typeof json === 'string')
      mainJson = JSON.parse(mainJson)

    let maxId = 0
    const map = {}

    function convert(json) {
      const option = Object.assign({}, json)
      delete option.children
      const vNode = new VNode(option)
      maxId = Math.max(+option.id, maxId)
      map[option.id] = vNode

      if (Array.isArray(json.children) && json.children.length > 0) {
        const children = []
        for (const item of json.children) {
          const child = convert(item)
          children.push(child)
        }
        vNode.children = children
      }

      return vNode
    }

    const node = convert(mainJson)

    maxId += 1

    return new VNodeTree(maxId, node, map)
  }

  /**
   * 生成含有data-os-id的html字符串写入临时文件用于预览区域展示
   * 
   * @returns 
   * @memberof VNodeTree
   */
  toPreviewHTML() {
    function convert(vNode) {
      if (vNode.tagName === '')
        return vNode.toHTML()
      let str = vNode.toHTML(true)
      if (vNode.children.length > 0)
        for (const child of vNode.children)
          str += convert(child)
      if (singleTagDom.indexOf(vNode.tagName) === -1)
        str += `</${vNode.tagName}>`
      return str
    }
    const html = convert(this.tree)
    return html
  }

  /**
   * 临时文件路径
   * 
   * @memberof VNodeTree
   */
  setPath(path) {
    this.path = path
  }

  /**
   * 标题
   * 
   * @memberof VNodeTree
   */
  setTitle(title) {
    this.title = title
  }
}

export default VNodeTree
