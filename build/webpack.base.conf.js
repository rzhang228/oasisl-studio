const path = require('path')
const webpack = require('webpack')

// const DashboardPlugin = require('webpack-dashboard/plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      COMPONENT: resolve('src/renderer/components'),
      ACTION: resolve('src/renderer/redux/actions'),
      REDUCER: resolve('src/renderer/redux/reducers'),
      STORE: resolve('src/renderer/redux/store'),
      ROUTE: resolve('src/renderer/routes'),
      SERVICE: resolve('src/renderer/services'),
      UTIL: resolve('src/renderer/utils')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /(node_modules)/
        ],
        use: [
          'babel-loader', {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter'),
              emitWarning: true
            }
          }
        ]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 10KB 以下使用 base64
          name: 'img/[name]-[hash:6].[ext]'
        }
      }
    ]
  },

  plugins: [
    // new DashboardPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}