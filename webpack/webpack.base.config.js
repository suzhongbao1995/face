const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/main.tsx'),
  output: {
    filename: 'static/js/[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    /**
     * 定义环境变量
     */
    new DefinePlugin({
      __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (resourcePath) => {
                  // 过滤调antd中的样式，css modules会覆盖antd的样式，导致antd的样式不生效
                  // reset的文件不能被css modules，因为#root在模版中不会被webpack处理
                  if (/(antd|reset)/.test(resourcePath)) {
                    return false;
                  }
                  return true;
                },
                localIdentName: '[name]-[local]-[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/antd'),
          path.resolve(__dirname, '../node_modules/@ant-design'),
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg|)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'images/[name]-[hash:10][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@config': path.resolve(__dirname, '../src/config'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@routers': path.resolve(__dirname, '../src/routers'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@models': path.resolve(__dirname, '../src/models'),
    },
  },
};
