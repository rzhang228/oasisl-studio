import defaultOption from './default'
import singleTagDom from './singleTagDom'

/**
 * 虚拟dom类
 * 
 * @class VNode
 */
class VNode {
  constructor(option) {
    if (!option.id)
      throw new Error('id is required')
    if (!option.type)
      throw new Error('type is required')

    Object.assign(this, defaultOption, option)
  }

  /**
   * 连同children转为JSON
   * 
   * @returns
   * @memberof VNode
   */
  toJSON() {
    function convert(vNode) {
      const json = vNode.getJSON()
      json.children = []

      if (vNode.children.length > 0)
        for (const child of vNode.children)
          json.children.push(convert(child))
      return json
    }

    return convert(this)
  }

  /**
   * 当前节点转为json（不包括children）
   * 
   * @returns 
   * @memberof VNode
   */
  getJSON() {
    // 这样写会报错，不晓得为什么
    // let json = { id, type, tagName, moduleName, moduleChineseName, attr, text, style, option } = this
    const json = {}
    json.id = this.id
    json.type = this.type
    json.tagName = this.tagName
    json.moduleName = this.moduleName
    json.moduleChineseName = this.moduleChineseName
    json.attr = Object.assign({}, this.attr)
    json.text = this.text
    // json.style = Object.assign({}, this.style)
    json.option = Object.assign({}, this.option)

    return json
  }

  /**
   * 转为单标签html字符串（不包括children，单tag）
   * 
   * @param {Boolean} withId
   * @returns 
   * @memberof VNode
   */
  toHTML(withId = false) {
    if (this.tagName === '')
      return this.text

    let str = `<${this.tagName}`
    for (const attrName in this.attr)
      if ({}.hasOwnProperty.call(this.attr, attrName))
        str += ` ${attrName}="${this.attr[attrName]}"`

    if (withId)
      str += ` data-os-id="${this.id}"`

    if (singleTagDom.indexOf(this.tagName) !== -1)
      str += ' />'
    else
      str += '>'

    return str
  }

  /**
   * 在当前节点的子节点中添加节点（默认最后一位添加）
   * 
   * @param {any} vNode 
   * @param {any} [index=vNode.children.length] 
   * @memberof VNode
   */
  addChild(vNode, index = vNode.children.length) {
    this.children.splice(index, 0, vNode)
  }
}

export default VNode
