const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// const DashboardPlugin = require('webpack-dashboard/plugin')

//判断当前运行环境是开发模式还是生产模式
// const nodeEnv = process.env.NODE_ENV.trim() || 'development'
// const isPro = nodeEnv === 'production'

const src = path.join(__dirname, '../src/renderer');     // 开发源码目录

/* if (isPro) {
  plugins.push(
    new BundleAnalyzerPlugin({
      generateStatsFile: true
    }),
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      ie8: true
    })
  )
} else {
  // plugins.unshift('react-hot-loader/patch', `webpack-dev-server/client?http://${serverConfig.host}:${serverConfig.port}`, 'webpack/hot/only-dev-server')
} */

module.exports = {
  context: path.resolve(__dirname, '../'),

  target: 'electron-renderer',

  // watch: !isPro,
  // devtool: isPro ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/renderer/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: './',
    chunkFilename: '[name].js'
  },

  // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      COMPONENT: path.join(__dirname, '../src/renderer/components'),
      ACTION: path.join(__dirname, '../src/renderer/redux/actions'),
      REDUCER: path.join(__dirname, '../src/renderer/redux/reducers'),
      STORE: path.join(__dirname, '../src/renderer/redux/store'),
      ROUTE: path.join(__dirname, '../src/renderer/routes'),
      SERVICE: path.join(__dirname, '../src/renderer/services'),
      UTIL: path.join(__dirname, '../src/renderer/utils')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /(node_modules)/
        ],
        loader: 'babel-loader'
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