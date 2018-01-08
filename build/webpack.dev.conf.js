const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseConf = require('./webpack.base.conf')

console.log('当前运行环境：development')

module.exports = merge(baseConf, {
  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 8080,
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local].[hash:base64]',
            sourceMap: true
          }
        }, {
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
    new CleanWebpackPlugin('dist', {
      root: path.join(__dirname, '../'),
      verbose: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      // 定义全局变量
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
})