-------------------------------------------------------
 NEXT UP
-------------------------------------------------------
 - React.lazy & webpack code-splitting
 - pretty sure you can define a component, create a styled version
   of it after the fact, and then export the styled version.

-------------------------------------------------------
 BUGS
-------------------------------------------------------
AuthForm
Pressing escape in username field causes screen to go blank.

Box.jsx
1. where is it???
2. If you deleted it, you need to go excise it out everywhere.

GlobalStyle.jsx:
1. unmatched bracket in GlobalStyle.jsx

App.jsx:
1. Are these lines necessary?
  import { serverConsoleUrl } from 'config';
  import { closeConsole, createConsole } from './AppConsole';

clientRequests:
1. Your 'PUT' requests I think may be all wrong.
2. Reread this: https://medium.com/backticks-tildes/restful-api-design-put-vs-patch-4a061aa3ed0b
3. Either modify PUT or consider PATCH

-------------------------------------------------------
 LINTING ISSUES
-------------------------------------------------------
 - stylelint is not working. caniuse-lite is outedated (see output screen)
    https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint

    https://github.com/stylelint/stylelint#getting-started

    https://stylelint.io/user-guide/configure

    https://github.com/postcss/autoprefixer/issues/1184

 - eslint appears to be yacking about something in the
   out put screen

-------------------------------------------------------
 [maybe] USE MORE DESTRUCTURING IN STYLED COMPONENTS
-------------------------------------------------------
https://github.com/styled-components/styled-components/issues/273

-------------------------------------------------------
 TIMER
-------------------------------------------------------
the timer start counting from when the time form is pulled up, not from the time the submit button is hit.

-------------------------------------------------------
 LOCKED ENTRY CARDS
-------------------------------------------------------
if the title is too long, and just one word, that word pushes the menu out of sight and out of the card

-------------------------------------------------------
 CLEAN UP MEDIA QUERIES
-------------------------------------------------------
Finish replacing code like this:
  @media (max-width: ${({ theme }) => theme.bp[4]}) {
    width: 100vw;
  }
With code like this:
  @media ${device.phone} {
    display: none;
  }
  @media ${device.desktopLG} {
    display: grid;
    margin-right: ${({ theme }) => theme.p(1)};
  }
And then delete this from the theme:
  const bp = [
    null,
    '66rem',  // DESKTOP    -->  1056px -->  Hides 'TimeLockr'
    '51rem',  // TABLET_LG  -->  816px  -->  Relocates (+) button
    '44rem',  // TABLET_SM  -->  736px  -->  Hides side panels
    '44rem',  // TABLET_SM  -->  704px  -->  Main, AppBar, TabBar, CardAreaTabs, and CardArea --> width becomes 100%
    '31rem',  // PHONE      -->  656px
    '0rem',   // 6
  ];
And also
  {
    ...
    bp,
    ...
  }
Also consider replacing all of the "abp" code with something similar to "device"

-------------------------------------------------------
 FIX PICKER ISSUES
-------------------------------------------------------
on right monitor it changes format in an undesirable way.
maybe just need to change media queries, but there seems to
be something more than that required.
I want just the calendar, not the decorative area on the left that
the Month and day takes up two rows.
e.g.,

  2020
  Mon,
  Feb
  24

looks sloppy.

...actually, the problem is that the decorative area normally on the top
moves left for some reason.  Even if the window does not change.  What matters
is that the left is on a bigger monitor.  Still sounds like media queries,
but the issue is with the monitor size, not the window size.


/*
PER WEBPACK DOCUMENTATION:

These plugins can be removed from configuration as they are default in production mode:
 - NoEmitOnErrorsPlugin(),
 - ModuleConcatenationPlugin(),
 - DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
 - UglifyJsPlugin()

MISCELLANOUS
  - adding  "--json > ./stats.json" will cause webpack to output a stats file
  - Contrary to expectations, process.env.NODE_ENV is not set to
    'production' within the build script webpack.config.js
  - webpack.EnvironmentPlugin not needed because Dotenv plugin is installed.
  - NpmInstallWebpackPlugin: Automatically instaLl. & save dependencies.

IMPORTANT DISTINCTIONS
  - prefetching and preloading concerns the TIMING of DOWNLOADING specific chunks
  - lazy loading is the splitting up of code and LOADING it at specific times
  (2x check)

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

  Adding UglifyJS with Terser saves a tiny bit of memory


------------------------------------------------------------------------
PUBLIC PATH IN MY ASS
------------------------------------------------------------------------
The publicPath specifies the public URL address of the output files when referenced in a
browser. For loaders that embed <script> or <link> tags or reference assets like images,
publicPath is used as the href or url() to the file when it's different than their location
on disk (as specified by path). This can be helpful when you want to host some or all output
files on a different domain or on a CDN.

 ∙∙∙ The Webpack Dev Server also uses this to determine the path where the output ∙∙∙
 ∙∙∙ files are expected to be served from. As with path you can use the [hash]    ∙∙∙
 ∙∙∙ substitution for a better caching profile.                                   ∙∙∙

------------------------------------------------------------------------
ANNOTATED CONFIG FILE --- KEEP UPDATED
------------------------------------------------------------------------
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// ALSO NEED TO MAKE SURE DATA IS RETRIVED ASAP, TO LOAD CARDS
// bring back the bootstrap cdn.  The new size looks like shit.

// devServer.contentBase: if stuff goes wrong, add this back to dev-server to see if it helps
// I think it only matters when you are outputting bundle files, which you are not
// doing in dev mode.  You would probably need this line if you were trying to run
// the production build: contentBase: path.resolve(__dirname, '../build'),

// CopyWebpackPlugin: I think this is when you need to copy a large folder of static assets
// into your build folder.  The other loaders move different types of files that are
// referenced in the javascript code itself.  This seems to be stuff you need, but do not
// use an import statement to bring into your app via JS code.

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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          extractComments: true,
        },
      }),
    ],
    // FUNCTION: reduces bundle size by preventing duplication of modules
    // EFFECT: Smaller bundle, faster load times.
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    // CleanWebpackPlugin()
    // Function: empties 'dist' before rebuilding
    new CleanWebpackPlugin(),
    // ModuleConcatenationPlugin
    // Function: 'hoist' or concatenate the scope of all your modules into one closure
    // and allow for your code to have a faster execution time in the browser
    // Result: faster execution at runtime
    // Notes: (1) Automatically disabled when not in production mode
    //        (2) babel 'modules' option needs to be set to false.
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
    }),
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
      template: path.resolve(__dirname, '../src/assets/index.html'),
      title: 'TimeLockr',
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      meta: { viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' },
      inject: 'body',
    }),
    // ContextReplacementPlugin
    // Function: ...cannot remember why I added this.
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
      contentBase: path.resolve(__dirname, '../build'),
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


------------------------------------------------------------------------
STUDY NOTES AND PLANNED EXERCISES FOR WEBPACK OPTIMIZATION
------------------------------------------------------------------------
 Misc Loaders (1+)
------------------------------------------------------------------------
• mini-css-extract-plugin
• bundle-loader
• promise-loader
• terser (minifies bundle)
+ Extract 1-2 MUI icon dependencies (1+)
  (Then watch webpack file or url loader copy them as assets to dist folded)
------------------------------------------------------------------------
 Dynamic Import
------------------------------------------------------------------------
  • then() (1+)
  • async await (1+)
  • WEBPACK.CONFIG.JS: output: { ..., chunkFilename: '[name].bundle.js', ... }
  • COMPONENT FILE:    import(/* webpackChunkName: "lodash" ____'lodash');
------------------------------------------------------------------------
 Analysis Tools (2+)
------------------------------------------------------------------------
  • analysis
  • webpack-chart
  • webpack-visualizer
  • webpack-bundle-analyzer
  • webpack bundle optimize helper
  • bundle-stats

------------------------------------------------------------------------
 Loadable Components (1+)
------------------------------------------------------------------------
•  Library splitting
@loadable/component supports library splitting using render props. This is not possible with React.lazy.

------------------------------------------------------------------------
 SplitChunksPlugin (1+)
------------------------------------------------------------------------
1+ prefetch/1+ preload
• PREFETCH: resource is probably needed for some navigation in the future
• PRELOAD: resource might be needed during the current navigation

DIFFERENCES
A preloaded chunk starts loading in parallel to the parent chunk.
A prefetched chunk starts after the parent chunk finishes loading.

A preloaded chunk has medium priority and is instantly downloaded.
A prefetched chunk is downloaded while the browser is idle.

A preloaded chunk should be instantly requested by the parent chunk.
A prefetched chunk can be used anytime in the future.

Browser support is different.

------------------------------------------------------------------------
 Multiple Entry Points
------------------------------------------------------------------------
  • Single-page applications...?... might be able to split your authorization page into one bundle, and the rest of your app into another bundle.
  • Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the number of entry points increases.
   •• Gives optimization.splitChunks chance to create bundles of shared application code between each page.
  • dependOn entry option (don't use, better options)

------------------------------------------------------------------------
 MISCELANEOUS
------------------------------------------------------------------------
React.lazy (1+)
Webpack Merge (Try this again. good for "Scalable webpack configurations")

------------------------------------------------------------------------
 SKIP ME
------------------------------------------------------------------------


———————————————————————————————————————————————————————————————————————————————
 OPTIMIZATION GAINS
———————————————————————————————————————————————————————————————————————————————
  Built at: 02/28/2020 12:39:00 PM
           favicon.ico   66.1 KiB
            index.html  416 bytes
        main.bundle.js    148 KiB
vendors~main.bundle.js   1.12 MiB

Built at: 02/28/2020 12:53:34 PM
           favicon.ico   66.1 KiB
            index.html  416 bytes
        main.bundle.js    148 KiB
vendors~main.bundle.js   1.12 MiB

Built at: 02/28/2020 12:57:28 PM
           2.bundle.js   48.6 KiB
           3.bundle.js    3.2 KiB
           4.bundle.js   4.37 KiB
           favicon.ico   66.1 KiB
            index.html  416 bytes
        main.bundle.js    141 KiB
vendors~main.bundle.js   1.08 MiB

Built at: 02/28/2020 1:00:07 PM
           2.bundle.js   48.6 KiB
           3.bundle.js    3.2 KiB
           4.bundle.js   4.37 KiB
           favicon.ico   66.1 KiB
            index.html  416 bytes
        main.bundle.js    141 KiB
vendors~main.bundle.js   1.08 MiB

Built at: 02/28/2020 1:01:51 PM
           2.bundle.js   48.6 KiB
           3.bundle.js    3.2 KiB
           4.bundle.js   4.37 KiB
           favicon.ico   66.1 KiB
            index.html  416 bytes
        main.bundle.js    141 KiB
vendors~main.bundle.js   1.08 MiB

Built at: 02/28/2020 1:14:51 PM
             card-area-chunk.bundle.js    3.2 KiB
        card-area-tabs-chunk.bundle.js   4.37 KiB
                           favicon.ico   66.1 KiB
                            index.html  416 bytes
                        main.bundle.js    141 KiB
vendors~card-area-tabs-chunk.bundle.js   48.6 KiB
                vendors~main.bundle.js   1.08 MiB

Built at: 02/28/2020 2:04:46 PM
        card-area-tabs.bundle.js   4.37 KiB
             card-area.bundle.js    3.2 KiB
                     favicon.ico   66.1 KiB
         feteched-main.bundle.js   10.3 KiB
                      index.html  416 bytes
                  main.bundle.js    136 KiB
vendors~card-area-tabs.bundle.js   48.6 KiB
          vendors~main.bundle.js   1.07 MiB

Built at: 02/28/2020 2:10:05 PM
                           Asset       Size
        card-area-tabs.bundle.js   20.6 KiB
             card-area.bundle.js   15.2 KiB
                     favicon.ico   66.1 KiB
         feteched-main.bundle.js   31.6 KiB
                      index.html  416 bytes
                  main.bundle.js    672 KiB
vendors~card-area-tabs.bundle.js    152 KiB
          vendors~main.bundle.js   10.1 MiB
———————————————————————————————————————————————————————————————————————————————
ADDED UGLIFYJSPLUGIN
———————————————————————————————————————————————————————————————————————————————
Built at: 02/28/2020 2:17:40 PM
        card-area-tabs.bundle.js   4.35 KiB
             card-area.bundle.js   3.17 KiB
                     favicon.ico   66.1 KiB
         feteched-main.bundle.js   10.3 KiB
                      index.html  416 bytes
                  main.bundle.js    136 KiB
vendors~card-area-tabs.bundle.js   48.5 KiB
          vendors~main.bundle.js   1.07 MiB
———————————————————————————————————————————————————————————————————————————————
ALL COMMENTS FILTERED
———————————————————————————————————————————————————————————————————————————————
        card-area-tabs.bundle.js   4.35 KiB
             card-area.bundle.js   3.17 KiB
                     favicon.ico   66.1 KiB
                      index.html  416 bytes
                  main.bundle.js    136 KiB
        prefeched-main.bundle.js   10.3 KiB
vendors~card-area-tabs.bundle.js   48.5 KiB
          vendors~main.bundle.js   1.07 MiB
———————————————————————————————————————————————————————————————————————————————
CHANGING "en" TO "en-gb" in
webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb/),
to properly exclude locale files
———————————————————————————————————————————————————————————————————————————————
Built at: 03/01/2020 4:15:47 AM
          card-area-tabs.bundle.js   4.39 KiB
               card-area.bundle.js   3.22 KiB
                       favicon.ico   66.1 KiB
                        index.html  416 bytes
                    main.bundle.js    136 KiB
          prefeched-main.bundle.js   10.3 KiB
  vendors~card-area-tabs.bundle.js   48.7 KiB
            vendors~main.bundle.js   1.06 MiB
vendors~main.bundle.js.LICENSE.txt   2.21 KiB
———————————————————————————————————————————————————————————————————————————————
ADDING "-p" TO "npm run build"
Some of what has been described above can also be achieved by using
the command line. For example, the --optimize-minimize flag will
include the TerserPlugin behind the scenes. The --define
process.env.NODE_ENV="'production'" will do the same for the DefinePlugin
instance described above. And, webpack -p will automatically invoke
both those flags and thus the plugins to be included.
———————————————————————————————————————————————————————————————————————————————
Built at: 03/01/2020 4:53:07 AM
          card-area-tabs.bundle.js   4.39 KiB
               card-area.bundle.js   3.22 KiB
                       favicon.ico   66.1 KiB
                        index.html  416 bytes
                    main.bundle.js    136 KiB
          prefeched-main.bundle.js   9.93 KiB
  vendors~card-area-tabs.bundle.js   43.6 KiB
            vendors~main.bundle.js    717 KiB
vendors~main.bundle.js.LICENSE.txt   2.76 KiB

Built at: 03/01/2020 6:02:27 AM
                    card-area-tabs.bundle.js   12.4 KiB
        card-area-tabs.bundle.js.LICENSE.txt  538 bytes
                         card-area.bundle.js   9.44 KiB
             card-area.bundle.js.LICENSE.txt  354 bytes
                                 favicon.ico   66.1 KiB
                                  index.html  416 bytes
                              main.bundle.js    421 KiB
                  main.bundle.js.LICENSE.txt     13 KiB
                    prefeched-main.bundle.js   19.9 KiB
        prefeched-main.bundle.js.LICENSE.txt  747 bytes
            vendors~card-area-tabs.bundle.js    125 KiB
vendors~card-area-tabs.bundle.js.LICENSE.txt   6.67 KiB
                      vendors~main.bundle.js   8.52 MiB
          vendors~main.bundle.js.LICENSE.txt    158 KiB


Built at: 03/01/2020 6:03:55 AM
          card-area-tabs.bundle.js   4.39 KiB
               card-area.bundle.js   3.22 KiB
                       favicon.ico   66.1 KiB
                        index.html  416 bytes
                    main.bundle.js    136 KiB
          prefeched-main.bundle.js   9.93 KiB
  vendors~card-area-tabs.bundle.js   43.6 KiB
            vendors~main.bundle.js    717 KiB
vendors~main.bundle.js.LICENSE.txt   2.76 KiB
