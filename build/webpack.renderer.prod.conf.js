const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const baseConf = require('./webpack.renderer.base.conf')

console.log('当前运行环境：production')

module.exports = merge(baseConf, {
  devtool: false,

  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('precss')(),
                require('autoprefixer')()
              ]
            }
          }]
        })
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      // 定义全局变量
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].css',
      allChunks: true
    })
  ]
})