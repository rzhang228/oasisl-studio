const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConf = require('./webpack.renderer.base.conf')

console.log('当前运行环境：development')

module.exports = merge(baseConf, {
  devtool: 'eval-source-map',

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('precss')(),
              require('autoprefixer')()
            ]
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      // 定义全局变量
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
})