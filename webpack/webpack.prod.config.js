const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minChunks: 1,
          minSize: 0,
          priority: 1,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 0,
          priority: 0,
        },
      },
    },
  },
});
