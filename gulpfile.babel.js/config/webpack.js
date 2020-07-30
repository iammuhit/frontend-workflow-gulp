import path from 'path';
import webpack from 'webpack';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import app from '../bootstrap/app';

const paths = app.config('paths');
const files = app.config('files');
const helper = app.helper('general');

const HtmlWebpackPlugin = app.plugins.htmlWebpackPlugin;

module.exports = {
    mode: app.env.APP_ENV,
    entry: {
        app: path.resolve(paths.src.esm, files.src.es)
    },
    output: {
        filename: 'assets/js/[name].bundle.js',
        path: paths.build.base
    },
    optimization: { minimize: true },
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({ filename: 'assets/js/[name].bundle.js.map' }),
        new webpack.ProvidePlugin({}),
        new webpack.BannerPlugin({
            banner: helper.banner(app.config('banner').webpack, { app: app.config('app') })
        }),
        new VueLoaderPlugin(),
        // new HtmlWebpackPlugin()
    ],
    externals: {
        jquery: 'jQuery',
        vue: 'Vue',
        lodash: { commonjs: 'lodash', amd: 'lodash', root: '_' }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [paths.src.esm],
                loader: 'eslint-loader'
            },
            {
                test: /\.js?$/,
                include: [paths.src.esm],
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [ 'vue-style-loader', 'css-loader' ]
            }
        ]
    }
};