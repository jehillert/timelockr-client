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
    // Docker requirement. See https://pythonspeed.com/articles/docker-connection-refused/ for explanation.
    // See https://webpack.js.org/configuration/dev-server/#devserverhost for instructions re specifying host.
    host: '0.0.0.0',
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
      filename: '[file].js.map',
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
