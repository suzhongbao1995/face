const path = require('path');
const { merge } = require('webpack-merge');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, '../public')
    }
  },
  plugins: [
    new EslintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: 'node_modules'
    })
  ]
};

module.exports = merge(baseConfig, devConfig);
