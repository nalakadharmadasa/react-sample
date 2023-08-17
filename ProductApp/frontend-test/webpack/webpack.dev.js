const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "../build"),
    },
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
    liveReload: true,
  },
});
