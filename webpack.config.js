const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV,
  entry: {
    // Each key will represent a different bundle.js file
    // The key will be prepended to '.bundle.js', as specified
    // in the output section below.
    app: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    // '[name] allows multiple bundles to be created
    // with different names and injected into index.html
    filename: '[name].bundle.js',
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
    new CleanWebpackPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/assets/index.html'),
      title: 'TimeLockr',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
      meta: { viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' },
      inject: 'body',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      actions: path.resolve(__dirname, 'src/actions/index.js'),
      components: path.resolve(__dirname, 'src/components/index.js'),
      config: path.resolve(__dirname, 'config.js'),
      store: path.resolve(__dirname, 'src/store.js'),
      theme: path.resolve(__dirname, 'src/theme/index.js'),
      types: path.resolve(__dirname, 'src/actions/types.js'),
      utilities: path.resolve(__dirname, 'src/utilities/index.js'),
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    // app.bundle.js loaded from memory, not from a fenerated file.
    config.devServer = {
      // Needed so HtmlWebpackPlugin can serve static files
      // Also needed for generation of sourcemaps
      contentBase: path.resolve(__dirname, 'build'),
      // 'npm start' will additionally open localhost to display app
      open: true, localhost
    };

    return config;
  }

  config.mode = 'production';
  config.devtool = 'none';

  return config;
};

/*
  NOTES
    webpack.EnvironmentPlugin not needed because Dotenv plugin is installed.
  PLUGIN DESCRIPTIONS
    NpmInstallWebpackPlugin: Automatically instal & save dependencies.
*/
