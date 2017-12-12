const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const DashboardPlugin = require('webpack-dashboard/plugin')

const serverConfig = require('./server.config')

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV.trim() || 'development'
const isPro = nodeEnv === 'production'

const src = path.join(__dirname, 'src/web');     // 开发源码目录

console.log('当前运行环境：', isPro ? 'production' : 'development')

let plugins = [
  // new DashboardPlugin(),
  new CleanWebpackPlugin('dist', {
    root: __dirname,
    verbose: false
  }),
  new webpack.optimize.CommonsChunkPlugin({  // 抽取公共代码
    name: 'vendor'
  }),
  new webpack.DefinePlugin({
    // 定义全局变量
    'process.env': {
      'NODE_ENV': JSON.stringify(nodeEnv)
    },
    // ================================
    // 配置开发全局常量
    // ================================
    __DEV__: nodeEnv === 'development',
    __PROD__: nodeEnv === 'production',
    __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
    __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(src, 'index.html'),
    chunks: ['app', 'vendor']
  }),
  new CopyWebpackPlugin([ // 复制高度静态资源
    {
      from: path.join(src, 'oasisl'),
      to: path.join(__dirname, 'dist/oasisl'),
      toType: 'dir'
    }
  ])
]

if (isPro) {
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
  // app.unshift('react-hot-loader/patch', `webpack-dev-server/client?http://${webpackServerConfig.host}:${webpackServerConfig.port}`, 'webpack/hot/only-dev-server')
  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = {
  devtool: isPro ? 'source-map' : 'inline-source-map',
  entry: {
    vendor: ['react', 'react-dom'],
    app: path.join(src, 'index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: './',
    chunkFilename: '[name].js'
  },
  // BASE_URL是全局的api接口访问地址
  plugins,
  // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      src
    ],
    alias: {
      COMPONENT: path.join(src, 'components'),
      ACTION: path.join(src, 'redux/actions'),
      REDUCER: path.join(src, 'redux/reducers'),
      STORE: path.join(src, 'redux/store'),
      ROUTE: path.join(src, 'routes'),
      SERVICE: path.join(src, 'services'),
      UTIL: path.join(src, 'utils')
    }
  },
  devServer: {
    // host: serverConfig.host,
    // port: serverConfig.port,
    contentBase: path.join(__dirname, 'dist'),
    // historyApiFallback: true,
    // hot: true,
    // inline: true,
    // compress: true
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.(scss|css)$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 1
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
    }]
  }
}