const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const baseConf = require('./webpack.base.conf')

console.log('当前运行环境：production')

module.exports = merge(baseConf, {
  devtool: false,

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true
            }
          }, {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('precss')(),
                  require('autoprefixer')()
                ]
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('dist', {
      root: path.join(__dirname, '../'),
      verbose: false
    }),
    new webpack.DefinePlugin({
      // 定义全局变量
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename:  '[name]-[hash].css',
      allChunks: true
    })
  ]
})