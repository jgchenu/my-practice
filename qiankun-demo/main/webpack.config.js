const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let envConfig = {};

const alias = require('./alias');
const __DEV__ = process.env.NODE_ENV === 'development';
const ANY = process.env.ANY;
const __MOCK__ = process.env.MOCK;

const ROOT_PATH = path.resolve(__dirname, '.');
const mode = __DEV__ ? 'development' : 'production';

const styleLoaderOrMiniCssLoader = __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader;

try {
  if (__DEV__) {
    envConfig = require('./env.config');
  }
} catch (error) {
  console.error('not found env config', error.message);
}

const config = {
  mode,
  devtool: __DEV__ ? 'cheap-module-source-map' : 'source-map',
  entry: path.resolve(ROOT_PATH, './src/index.tsx'),
  output: {
    filename: __DEV__ ? '[name].js' : '[name]-[contenthash].js',
    chunkFilename: __DEV__ ? '[name].js' : '[name]-[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    compress: true,
    open: false,
    port: 8088,
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
              patterns: [path.resolve(ROOT_PATH, 'src/styles/variables.less')],
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
      process: JSON.stringify({ env: envConfig }),
    }),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(ROOT_PATH, './static/template.html'),
      minify: {
        collapseWhitespace: !__DEV__,
      },
      env: __DEV__ ? 'development' : 'production',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: __DEV__ ? '[name].css' : '[name]-[contenthash].css',
      chunkFilename: __DEV__ ? '[name].css' : '[name]-[contenthash].css',
    }),
    new AntdDayjsWebpackPlugin(),
    ANY && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      ...alias,
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@remix-run/router': 'RemixRouter',
    'react-router-dom': 'ReactRouterDOM',
    'react-router': 'ReactRouter',
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

// hmr react
if (__DEV__) {
  config.plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }));
}

module.exports = config;

console.log('current env', __DEV__, __MOCK__);
