const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { merge } = require('webpack-merge');

const prodConfig = require('./webpack.prod.config');

module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [new BundleAnalyzerPlugin()],
  })
);
