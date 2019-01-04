const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: "./dist/bundle.js"
  },
  module: {
    rules: [
       {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
};