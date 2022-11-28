const path = require("path");
module.exports = {
  entry: "../src/hash.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  // mode: "development",
  mode: "production",

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
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
};
