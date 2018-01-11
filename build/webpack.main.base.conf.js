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
  target: 'electron-main',

  entry: {
    index: './src/main'
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: resolve('dist/main')
  },

  plugins: [
    new CleanWebpackPlugin('main', {
      root: resolve('dist'),
      verbose: false
    })
  ]
})