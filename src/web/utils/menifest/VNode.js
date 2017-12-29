import defaultOption from './default'

/**
 * 虚拟dom类
 * 
 * @class VNode
 */
class VNode {
  /**
   * Creates an instance of VNode.
   * @param {any} option
   * 
   * @memberof VNode
   */
  constructor (option) {
    if (!option['id'])
      throw new Error('id is required')
    if (!option['type'])
      throw new Error('type is required')

    Object.assign(this, defaultOption, option)
  }

}

export default VNode