const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: [path.resolve(__dirname, '../src/index.jsx')],
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(js|jsx)$/, include: /node_modules/, use: ['react-hot-loader/webpack'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader/locals', 'less-loader'] },
            { test: /\.png$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/png' } }] },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'TimeLockr',
            filename: 'index.html',
            inject: 'body',
            favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
            template: path.resolve(__dirname, '../src/assets/index.html'),
            meta: { viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' },
        }),
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
