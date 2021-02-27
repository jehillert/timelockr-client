// AWS CONFIGURATION
import { resolve as _resolve } from 'path';
import { ContextReplacementPlugin } from 'webpack';
import Dotenv from 'dotenv-webpack';
import TerserPlugin from 'terser-webpack-plugin';

const config = {
  mode: process.env.NODE_ENV,
  entry: './src/index.jsx',
  output: {
    path: _resolve(__dirname, 'build'),
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
    new ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  ],
  devServer: {
    contentBase: './build',
    open: true, // npm start opens localhost
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      components: _resolve(__dirname, 'src/components/index.js'),
      config: _resolve(__dirname, 'config.js'),
      contexts: _resolve(__dirname, 'src/contexts/index.js'),
      theme: _resolve(__dirname, 'src/theme/index.js'),
      utilities: _resolve(__dirname, 'src/utilities/index.js'),
    },
  },
};

export default (env, argv) => {
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
