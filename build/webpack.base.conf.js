const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// const DashboardPlugin = require('webpack-dashboard/plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  target: 'electron-renderer',

  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/renderer/index'
  },

  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: './',
    chunkFilename: '[name].js'
  },

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
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 10KB 以下使用 base64
          name: 'img/[name]-[hash:6].[ext]'
        }
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
    // new DashboardPlugin(),
    new webpack.optimize.CommonsChunkPlugin({  // 抽取公共代码
      name: ['vendor']
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/renderer/index.html',
      chunks: ['app', 'vendor']
    }),
    new CopyWebpackPlugin([ // 复制高度静态资源
      {
        from: path.join(__dirname, '../oasisl'),
        to: path.join(__dirname, '../dist/oasisl'),
        toType: 'dir'
      }
    ])
  ]
}