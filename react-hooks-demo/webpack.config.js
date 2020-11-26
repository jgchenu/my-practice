const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口文件
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash].js",
    path: path.join(__dirname, "/dist"),
  },
  mode: "development",
  devtool: "inline-source-map",
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
    }),
  ],
};
