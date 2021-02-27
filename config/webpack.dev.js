const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Common = require('./webpack.common.js');

module.exports = merge(Common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devServer: {
    clientLogLevel: 'debug',
    contentBase: path.resolve(__dirname, '../build'),
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/, /en-gb/,
    ),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js'],
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      publicPath: 'http://localhost:8080/',
      fileContext: 'public',
    }),
  ],
});
/*
new webpack.SourceMapDevToolPlugin({
  filename: 'sourcemaps/[file].map',
  publicPath: 'https://example.com/project/',
  fileContext: 'public'
});
https://example.com/project/sourcemaps/bundle-[hash].js.map
*/
