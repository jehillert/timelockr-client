const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
    publicPath: '/timelockr-client/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', { loader: 'css-loader', options: { minimize: true } }, 'less-loader'] },
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
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      API_HOST: 'https://timelockr-server.herokuapp.com',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, 'client/indexes/components.jsx'),
      contexts: path.resolve(__dirname, 'client/indexes/contexts.jsx'),
      theme: path.resolve(__dirname, 'client/indexes/theme.jsx'),
      utilities: path.resolve(__dirname, 'client/indexes/utilities.jsx'),
    },
  },
};


/*
    path: path.resolve(__dirname, 'dist'),



THINGS YOU ARE DOING RIGHT
  Every time you declare 'new HtmlWebpackPlugin()', you will be generating another html file
    If one does not have a name specified, it becomes 'index.html'

  public path should be this, with both slashes and the name of the project:
    publicPath: '/timelockr-client/',
  and you want to have 'homepage' in package.json like so:
    "homepage": "https://jehillert.github.io/timelockr-client/",
  HTMLWebpackPlugin makes it so you do not have make an html file... or you can but it takes a lot of the gruntwork away.
    It has three million downloads per week.  That should tell you somehting.
  in path.resolve(), the last argument is a string that does not have a leading '/'

const HtmlWebpackPlugin = require('html-webpack-plugin')
    publicPath: '/timelockr-client/',
    new HtmlWebpackPlugin(),







  devtool: 'source-map',



















      { test: /\.css$/, use: ['style-loader', {loader: 'css-loader',
      options: {minimize: true}}, 'less-loader'] },


    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),

! TO FINISH:
!   minify production bundle
!     https://iamakulov.com/notes/webpack-front-end-size-caching/
!   go over webpack migration notes:
!      https://webpack.js.org/migrate/3/#dedupeplugin-has-been-removed

CONSIDER ADDING:
    One resource said adding this was suggested:

    https://github.com/webpack-contrib/mini-css-extract-plugin

    Can you replace dotenv or heroku env variables with vars defeined in webpack.DefinePlugin?

POSSIBLY REVERT TO:

new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'process.env.NODE_ENV',
      'process.env.API_HOST': '"https://timelockr-server.herokuapp.com"',
    }),

    'process.env.NODE_ENV': 'process.env.NODE_ENV',

    { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },

POSSIBLY NEEDED:
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  new CopyWebpackPlugin([{ from: './static/favicon.ico' }]),
  rules: [
    { test: /\.jsx?$/, include: /node_modules/, use: ['react-hot-loader/webpack'] },
  ]
  From tutorial (inside outdated "lodaders syntax"):
    { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file'}

NOTES:
- looks like ContextReplacementPlugin needs to be in both dev and production configs. I seem to
  recall it was required to avoid problems with moment.  Also, the following article includes it
  in webpack.common.js:
    https://medium.com/@hpux/webpack-4-in-production-how-make-your-life-easier-4d03e2e5b081
- Apparently webpackDefinePlugin will work in herokuj env (see checked answer):
    https://stackoverflow.com/questions/50319324/deploying-app-to-heroku-doesnt-work-if-used-together-with-defineplugin
- Why DefinePlugin and UglifyJsPlugin kept?
    https://iamakulov.com/notes/webpack-front-end-size-caching/
  Note that tutorial used DefinePlugin this way:
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    )}
- Why DedupePlugin removed:
In webpack 4.3:
  "DedupePlugin has been removed
  webpack.optimize.DedupePlugin isn't needed anymore. Remove it from your configuration."

SEE ALSO:
 - Good info on styling loader chaining: https://github.com/webpack-contrib/less-loader

*/
