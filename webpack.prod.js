const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(
  common,
  {
    plugins: [
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.DedupePlugin(),
      new UglifyJSPlugin()
    ]
  }
);
