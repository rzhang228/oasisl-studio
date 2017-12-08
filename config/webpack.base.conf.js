const path = require('path');
const webpack = require('webpack');
// const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

const rootPath = path.resolve(__dirname, '..'); // 项目根目录
const src = path.join(rootPath, 'src/web');         // 开发源码目录
const dist = path.join(rootPath, 'dist');       // 编译目录
const env = process.env.NODE_ENV.trim();        // 当前环境

module.exports = {
  entry: {
    app: path.join(src, 'index.js'),

    // ================================
    // 框架 / 类库 分离打包
    // ================================
    vendor: [
      // 'history',
      // 'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: dist,
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // ================================
      // 自定义路径别名
      // ================================
      // ASSET: path.join(src, 'assets'),
      COMPONENT: path.join(src, 'components'),
      ACTION: path.join(src, 'redux/actions'),
      REDUCER: path.join(src, 'redux/reducers'),
      STORE: path.join(src, 'redux/store'),
      ROUTE: path.join(src, 'routes'),
      SERVICE: path.join(src, 'services'),
      UTIL: path.join(src, 'utils')
      // HOC: path.join(src, 'utils/HoC'),
      // MIXIN: path.join(src, 'utils/mixins'),
      // VIEW: path.join(src, 'views')
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          // cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ],
          presets: ['es2015', 'react', 'stage-0']
          // env: {
          //   production: {
          //     presets: ['react-optimize']
          //   }
          // }
        }
      }],
      include: src,
      exclude: /node_modules/
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
    }]
  },
  // eslint: {
  //   formatter: require('eslint-friendly-formatter')
  // },
  plugins: [
    // new NyanProgressPlugin(), // 进度条
    new webpack.DefinePlugin({
      'process.env': { // 这是给 React / Redux 打包用的
        NODE_ENV: JSON.stringify('production')
      },
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: env === 'development',
      __PROD__: env === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
      __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
    })
  ]
};
