import VNode from './VNode'

/**
 * 一个VNodeTree对应一个静态页
 * 
 * @class VNodeTree
 */
class VNodeTree {

  constructor(idNext, tree, map) {
    this.idNext = idNext
    this.tree = tree
    this.map = map
  }

  /**
   * 使用默认模板创建一个新的VNodeTree对象
   * 
   * @memberof VNodeTree
   */
  static create() {
    return VNodeTree.parseJSON(require('./default.json'))
  }

  /**
   * 解析html
   * 
   * @static
   * @param {any} html
   * @returns 
   * @memberof VNodeTree
   */
  /* static parseHTML(html) {
    let xml = document.createElement("html")
    xml.innerHTML = html
    if (html.match(/html/)) {
      xml.setAttribute('data-os-id', 1)
    } else {
      xml = xml.children[0]
    }

    let maxId = 0
    let nodeList = {}
    let nodeTree = convert(xml)

    function convert(xml) {
      if (xml.nodeType != 1) {
        return null
      }
      let obj = {}
      obj['type'] = 1
      obj['tagName'] = xml.nodeName.toLowerCase()

      let flag = true
      obj['attr'] = {}
      for (let j = 0; j < xml.attributes.length; j++) {
        let attribute = xml.attributes.item(j)
        if (attribute.nodeName === 'data-os-id') {
          flag = false
          obj['id'] = attribute.nodeValue
          maxId = Math.max(+attribute.nodeValue, maxId)
          continue
        }
        obj['attr'][attribute.nodeName] = attribute.nodeValue
      }
      if (flag) {
        throw new Error('every node should have an attribute named "data-os-id"')
      }

      let nodeValue = (xml.textContent || "").replace(/(\r|\n)/g, "").replace(/^\s+|\s+$/g, "")

      if (nodeValue && xml.childNodes.length == 1) {
        obj['text'] = nodeValue
      }

      if (xml.childNodes.length > 0) {
        let items = []
        for (let i = 0; i < xml.childNodes.length; i++) {
          let node = xml.childNodes.item(i)
          let item = convert(node)
          if (item) {
            items.push(item)
          }
        }
        if (items.length > 0) {
          obj['children'] = items
        }
      }

      let vNode = new VNode(obj)

      nodeList[vNode['id']] = vNode

      return vNode
    }

    return new VNodeTree(++maxId, nodeTree, nodeList)
  } */

  /**
   * 解析json，返回VNodeTree，用于导入文件时读取menifest.json
   * 
   * @static
   * @param {any} json 
   * @returns 
   * @memberof VNodeTree
   */
  static parseJSON(json) {
    if (typeof json === 'string')
      json = JSON.parse(json)

    let maxId = 0
    let map = {}

    let node = convert(json)

    function convert(json) {
      let option = Object.assign({}, json)
      delete option.children
      let vNode = new VNode(option)
      maxId = Math.max(+option.id, maxId)
      map[option.id] = vNode

      if (Array.isArray(json['children']) && json['children'].length > 0) {
        let children = []
        for (let item of json['children']) {
          let child = convert(item)
          children.push(child)
        }
        vNode.children = children
      }

      return vNode
    }

    return new VNodeTree(++maxId, node, map)
  }

  /**
   * 生成json用于导出menifest.json（放在下面函数中，做一个递归完成）
   * 
   * @returns 
   * @memberof VNodeTree
   */
  /* toJSON() {
    return this.tree.toJSON()
  } */

  /**
   * 生成html、css、js字符串用于导出文件（html不含有data-os-id，样式全写在css中）
   * 
   * @returns 
   * @memberof VNodeTree
   */
  toFiles() {
    // TODO
    return {
      html: '',
      css: '',
      js: '',
      menifest: ''
    }
  }

  /**
   * 生成含有data-os-id的html字符串写入临时文件用于预览区域展示、生成htmlTree用于开发者工具区域展示
   * 
   * @returns 
   * @memberof VNodeTree
   */
  toHTMLTreeAndHTML() {
    // TODO
    return {
      html: '',  // 写入临时文件用于展示
      htmlTree: {  // 需要写一个组件解析此对象，生成类似开发者工具的dom结构展示
        string: '',
        hasClose: true,
        id: '',
        children: []
      }
    }
  }
}

export default VNodeTree