const name = require('./package.json').name;
const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.config');
const ROOT_PATH = path.resolve(__dirname, '.');
const __DEV__ = process.env.NODE_ENV === 'development';

const config = merge(baseConfig, {
  output: {
    library: `${name}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${name}`,
    globalObject: 'window',
    publicPath: __DEV__ ? '/' : `/${name}-entry`,
    path: path.resolve(ROOT_PATH, `../dist/${name}-entry`),
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.resolve(ROOT_PATH, './static/config.json') }],
    }),
  ],
});

module.exports = config;
