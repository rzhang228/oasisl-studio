import VNodeTree from './VNodeTree'
import VNode from './VNode'
/**
 * 新建基本虚拟dom
 * 
 * @returns 
 */
function create () {
  let count = 1

  let json = htmlToVNodeTree(`
  <html>
  <head>
    <meta charset="utf-8">
    <title>Oasisl Studio</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" type="text/css" href="./oasisl/css/oasisl.css">
    <link rel="stylesheet" type="text/css" href="./oasisl/css/oasicon.css">
  </head>
  <body>
  
    <div id="root">
      <input id="1" />
      <input id="2" />
    </div>
  
    <script type="text/javascript">
      jQuery = $ = require('./oasisl/js/lib/jquery/1.11.2/jquery.js')
    </script>
    <script src="./oasisl/js/oasisl.js"></script>
  </body>
  </html>
  `)

  console.log(json);
  

  /* let menifestJson = new VNode({
    "id": count++,
    "type": "1",
    "tagName": "html"
  })
  let menifestMap = {
    [menifestJson.id]: menifestJson
  }
  let head = new VNode({
    "id": count++,
    "type": "1",
    "tagName": "head"
  })
  let body = new VNode({
    "id": count++,
    "type": "1",
    "tagName": "body"
  })
  menifestJson.children.push(head)
  menifestJson.children.push(body)
  menifestMap[head.id] = head
  menifestMap[body.id] = body */
  
  // return new VNodeTree(count, menifestJson, menifestMap)
}

function htmlToVNodeTree (html) {
  let xml = document.createElement("html")
  xml.innerHTML = html

  return convert(xml)

  function convert (xml) {
    if (xml.nodeType != 1) {
      return null
    }
    var obj = {}
    obj.xtype = xml.nodeName.toLowerCase()
    var nodeValue = (xml.textContent || "").replace(/(\r|\n)/g, "").replace(/^\s+|\s+$/g, "")
  
    if (nodeValue && xml.childNodes.length == 1) {
      obj.text = nodeValue
    }
    if (xml.attributes.length > 0) {
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j)
        obj[attribute.nodeName] = attribute.nodeValue
      }
    }
    if (xml.childNodes.length > 0) {
      var items = []
      for (var i = 0; i < xml.childNodes.length; i++) {
        var node = xml.childNodes.item(i)
        var item = convert(node)
        if (item) {
          items.push(item)
        }
      }
      if (items.length > 0) {
        obj.items = items
      }
    }
    return obj
  }
}

export {
  create,
  htmlToVNodeTree
}