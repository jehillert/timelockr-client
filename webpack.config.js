// AWS CONFIGURATION
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV,
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(js|jsx)$/, include: /node_modules/, use: ['react-hot-loader/webpack'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader/locals', 'less-loader'] },
      { test: /\.png$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/png' } }] },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new Dotenv(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  ],
  devServer: {
    contentBase: './build',
    open: true, // npm start opens localhost
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, 'src/indexes/components.jsx'),
      config: path.resolve(__dirname, 'config.js'),
      contexts: path.resolve(__dirname, 'src/indexes/contexts.jsx'),
      theme: path.resolve(__dirname, 'src/indexes/theme.jsx'),
      utilities: path.resolve(__dirname, 'src/indexes/utilities.jsx'),
    },
  },
};

module.exports = (env, argv) => {
  console.log(argv.mode);
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  if (argv.mode === 'production') {
    config.devtool = 'none';
  }

  return config;
};

/*
  NOTES
    webpack.EnvironmentPlugin not needed because Dotenv plugin is installed.
  PLUGIN DESCRIPTIONS
    NpmInstallWebpackPlugin: Automatically instal & save dependencies.
*/


