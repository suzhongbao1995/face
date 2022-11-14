const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:5].css',
      chunkFilename: 'static/css/[name].chunk.css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          minChunks: 1,
          chunks: 'initial',
          minSize: 0,
          priority: 1,
        },
        common: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial',
          minSize: 0,
        },
      },
    },
  },
});
