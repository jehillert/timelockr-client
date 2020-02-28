const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV,

  entry: './src/index.jsx',
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/, options: { rootMode: 'upward' } },
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
    // FUNCTION: reduces bundle size by preventing duplication of modules
    // EFFECT: Smaller bundle, faster load times.
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    // ModuleConcatenationPlugin
    // Function: 'hoist' or concatenate the scope of all your modules into one closure
    // and allow for your code to have a faster execution time in the browser
    // Result: faster execution at runtime
    // Notes: (1) Automatically disabled when not in production mode
    //        (2) babel 'modules' option needs to be set to false.
    new webpack.optimize.ModuleConcatenationPlugin(),
    // CleanWebpackPlugin()
    // Function: empties 'dist' before rebuilding
    new CleanWebpackPlugin(),
    // Dotenv()
    // Function: Wraps dotenv and Webpack.DefinePlugin. As such, it does a text
    // replace in the resulting bundle for any instances of process.env.
    new Dotenv(),
    // HtmlWebpackPlugin()
    // Function: Create index.html from template file, adds a pair of script tags
    // for each [name].bundle.js, and sets other properties of HTML file according
    // to other options.
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/assets/index.html'),
      title: 'TimeLockr',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
      meta: { viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' },
      inject: 'body',
    }),
    // ContextReplacementPlugin
    // Function: ...cannot remember why I added this.
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/, /en/,
    ),
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
  // DEVELOPMENT
  if (argv.mode === 'development') {
    // made code referenced in the browser to corresponding source code.
    config.devtool = 'inline-source-map';
    // app.bundle.js loaded from memory, not from a fenerated file.
    config.devServer = {
      // Needed so HtmlWebpackPlugin can serve static files
      // Also needed for generation of sourcemaps.
      // Note: A relative path would be find here because dev-server is
      // for the developer's local environment. Also, use publicPath if
      // 'your page expects to find the bundle files on a different path'
      contentBase: path.resolve(__dirname, 'build'),
      // 'npm start' will additionally open localhost to display app
      open: true,
    };
    return config;
  }

  // PRODUCTION
  config.mode = 'production';
  config.devtool = 'none';
  return config;
};

/*
  MISCELLANOUS
    - webpack.EnvironmentPlugin not needed because Dotenv plugin is installed.
    - NpmInstallWebpackPlugin: Automatically instaLl. & save dependencies.

  ANALYSIS TOOLS
    analysis (default)
    package.json:
      "build:stats": "webpack --env production --json > stats.json",
    command line:
      npm run build:stats
    navigate web browser to:
      http://webpack.github.io/analyse/

    bundle optimize helper
      command line:
        npx webpack --mode production --profile --json > stats.json

  Multiple Entry Points - Object Syntax
    entry: {
      index: './src/index.js',
      page1: './src/page1-module.js',
      page2: './src/page2-module.js',
      page3: './src/page3-module.js',
    },
    output: {
      filename: '[name].bundle.js',
    },
*/
