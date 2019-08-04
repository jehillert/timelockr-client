// AWS CONFIGURATION
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(ts|tsx|js|jsx)$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
      { test: /\.(ts|tsx|js|jsx)$/, include: /node_modules/, use: ['react-hot-loader/webpack'] },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
  devServer: { contentBase: './build' },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, 'src/indexes/components.ts'),
      config: path.resolve(__dirname, 'config.ts'),
      contexts: path.resolve(__dirname, 'src/indexes/contexts.ts'),
      theme: path.resolve(__dirname, 'src/indexes/theme.ts'),
      utilities: path.resolve(__dirname, 'src/indexes/utilities.ts'),
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
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


