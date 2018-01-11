const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseConf = require('./webpack.base.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConf, {
  target: 'electron-renderer',

  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/renderer/index'
  },

  output: {
    path: resolve('dist/renderer'),
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 10KB 以下使用 base64
          name: 'fonts/[name]-[hash:6].[ext]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('renderer', {
      root: resolve('dist'),
      verbose: false
    }),
    new webpack.optimize.CommonsChunkPlugin({  // 抽取公共代码
      name: ['vendor']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/renderer/index.html',
      chunks: ['app', 'vendor']
    }),
    new CopyWebpackPlugin([ // 复制高度静态资源
      {
        from: path.join(__dirname, '../oasisl'),
        to: path.join(__dirname, '../dist/renderer/oasisl'),
        toType: 'dir'
      }
    ])
  ]
})