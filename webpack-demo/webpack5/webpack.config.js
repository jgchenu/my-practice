const path = require("path");
module.exports = {
  entry: "../src/hash.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  // cache: {
  //   type: "filesystem",
  //   // 可选配置
  //   buildDependencies: {
  //     config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
};
