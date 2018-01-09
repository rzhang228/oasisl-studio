export default {
  // 节点唯一标识
  id: '',
  // 节点类型，1：原生dom；2：oasisl基本元素；3：oasisl组件；4：echarts
  type: '',
  // type=1：当前dom标签名；否则：最外层dom标签名
  tagName: '',
  // type=3：组件名（用于初始化组件）
  moduleName: '',
  // 中文名，用于展示
  moduleChineseName: '',
  // type=1：当前dom属性；否则：最外层dom属性
  attr: {},
  // 标签内文本内容
  text: '',
  // type=1：当前dom样式对象；否则：最外层dom样式对象（仅表示行内样式）
  // style: {},
  // type=1,2：为空对象；否则：为配置项（包含默认与已配置字段）
  option: {},
  children: []
}

// 修改默认配置项需要修改此文件同时修改VNode.js中的getJSON方法
