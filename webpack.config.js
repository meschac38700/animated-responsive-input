const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    "inputElement.min": "./src/js/InputElement.js",
  },
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "src/js/"),
    filename: "[name].js"
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};