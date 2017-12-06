const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootPath = path.resolve(__dirname, '..'); // 项目根目录
const src = path.join(rootPath, 'src/web');         // 开发源码目录

let config = require('./webpack.base.conf');

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.watch = true;

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.rules.push({
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
});

config.plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(src, 'index.html'),
    chunksSortMode: 'none'
  })
)

module.exports = config;