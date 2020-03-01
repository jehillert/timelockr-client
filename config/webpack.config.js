const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// bring back the bootstrap cdn.  The new size looks like shit.

// devServer.contentBase: if stuff goes wrong, add this back to dev-server to see if it helps
// I think it only matters when you are outputting bundle files, which you are not
// doing in dev mode.  You would probably need this line if you were trying to run
// the production build: contentBase: path.resolve(__dirname, '../build'),

const config = {
  mode: process.env.NODE_ENV,
  entry: './src/index.jsx',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
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
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/assets/index.html'),
      title: 'TimeLockr',
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      meta: { viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' },
      inject: 'body',
    }),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/, /en-gb/,
    ),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      actions: path.resolve(__dirname, '../src/actions/index.js'),
      components: path.resolve(__dirname, '../src/components/index.js'),
      config: path.resolve(__dirname, '../config.js'),
      store: path.resolve(__dirname, '../src/store.js'),
      theme: path.resolve(__dirname, '../src/theme/index.js'),
      types: path.resolve(__dirname, '../src/actions/types.js'),
      utilities: path.resolve(__dirname, '../src/utilities/index.js'),
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.devServer = {
      open: true,
    };
    return config;
  }

  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          extractComments: true,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  };
  config.mode = 'production';
  config.devtool = 'none';
  return config;
};
