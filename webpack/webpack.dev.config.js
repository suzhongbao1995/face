const { merge } = require('webpack-merge');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const WebpackBar = require('webpackbar');

const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new EslintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: ['node_modules'],
    }),
    new WebpackBar({
      color: '#85d', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
  ],
};

module.exports = merge(baseConfig, devConfig);
