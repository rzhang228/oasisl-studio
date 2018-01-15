const path = require('path')

const pluginsPath = path.join(__dirname, '../plugins')

module.exports = {
  ReactDevToolExtensionPath: path.resolve(pluginsPath, 'react-dev-tool/2.5.2_0'),
  ReduxDevToolExtensionPath: path.resolve(pluginsPath, 'redux-dev-tool/2.15.1_0')
}
