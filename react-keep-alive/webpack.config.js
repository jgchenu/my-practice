const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const webpack = require('webpack');
const alias = require('./alias');
const __DEV__ = process.env.NODE_ENV === 'development';
const __MOCK__ = process.env.MOCK;

const ROOT_PATH = path.resolve(__dirname, '.');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const mode = __DEV__ ? 'development' : 'production';

const styleLoaderOrMiniCssLoader = __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader;
const config = {
  mode,
  devtool: __DEV__ ? 'cheap-module-source-map' : 'source-map',
  entry: path.resolve(ROOT_PATH, './src/index.tsx'),
  output: {
    filename: __DEV__ ? '[name].js' : '[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    compress: true,
    open: false,
    port: 8084,
    host: '0.0.0.0',
    hot: true,
    static: {
      directory: path.resolve(ROOT_PATH, 'static'),
    },
    allowedHosts: 'all',
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: styleLoaderOrMiniCssLoader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [path.resolve(ROOT_PATH, 'src/styles/index.less')],
              injector: 'append',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: styleLoaderOrMiniCssLoader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
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
        include: /node_modules/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024, // 1kb
          },
        },
      },
      {
        test: /\.(ttf|eot|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
      __MOCK__: JSON.stringify(__MOCK__),
    }),
    new StyleLintPlugin({
      context: path.resolve(ROOT_PATH, 'src'),
      files: ['**/*.css', '**/*.less'],
    }),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(ROOT_PATH, './static/template.html'),
      favicon: path.resolve(ROOT_PATH, './static/favicon.ico'),
      minify: {
        collapseWhitespace: !__DEV__,
      },
    }),
    new ESLintPlugin({
      failOnError: !__DEV__,
      extensions: ['js', 'ts', 'jsx', 'tsx'],
    }),
    new MiniCssExtractPlugin({
      filename: __DEV__ ? '[name].css' : '[name]-[contenthash:8].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      ...alias,
    },
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      // 分包代码
      cacheGroups: {
        react: {
          test: /node_modules\/.*(react).*/, // 只匹配node_modules里面的模块
          name: 'react-vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        redux: {
          test: /node_modules\/.*(redux).*/, // 只匹配node_modules里面的模块
          name: 'redux-vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        utils: {
          test: /node_modules\/.*(axios|yapi|classnames).*/, // 只匹配node_modules里面的模块
          name: 'utils-vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        antd: {
          test: /node_modules\/.*(antd).*/, // 只匹配node_modules里面的模块
          name: 'antd-vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        rc: {
          test: /node_modules\/.*(rc-).*/, // 只匹配node_modules里面的模块
          name: 'rc-vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        vendors: {
          // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 0, // 提取优先级为1
        },
      },
    },
  },
};

// hmr react
if (__DEV__) {
  config.plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }));
}

module.exports = config;
