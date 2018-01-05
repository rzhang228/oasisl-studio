import defaultOption from './default'

/**
 * 虚拟dom类
 * 
 * @class VNode
 */
class VNode {

  constructor(option) {
    if (!option['id'])
      throw new Error('id is required')
    if (!option['type'])
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

    return convert(this)

    function convert(vNode) {
      let json = vNode.getJSON()
      json.children = []

      if (vNode.children.length > 0) {
        for (let child of vNode.children) {
          json.children.push(convert(child))
        }
      }
      return json
    }
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
    let json = new Object()
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
   * 连同children转为html字符串
   * 
   * @returns 
   * @memberof VNode
   */
  toHTML() {
    // TODO
  }

  /**
   * 在当前节点的子节点中添加节点（默认最后一位添加）
   * 
   * @param {any} vNode 
   * @param {any} [index=vNode.children.length] 
   * @memberof VNode
   */
  addChild(vNode, index = vNode.children.length) {
    this['children'].splice(index, 0, vNode)
  }
}

export default VNode