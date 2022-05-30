const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const prod = process.env.NODE_ENV === "production";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: "./static/index.html",
  }),
  new webpack.DefinePlugin({
    __PUBLIC_URL__: "",
  }),
];

if (prod) {
  plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: "static/tinymce", to: "tinymce" }],
    }),
    new CleanWebpackPlugin()
  );
}

const config = {
  // 入口文件
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash].js",
    path: path.join(__dirname, "/dist"),
  },
  mode: prod ? "production" : "development",
  devtool: prod ? "sourcemap" : "inline-source-map",
  // 配置服务端目录和端口
  devServer: {
    contentBase: "./static",
    port: 3000,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    // 配置相应的规则
    rules: [
      {
        test: /\.js[x]?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // 配置相应的插件
  plugins,
};

module.exports = config;
