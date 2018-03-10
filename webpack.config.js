const path = require('path');
const Html = require('html-webpack-plugin');
const webpack = require('webpack');


const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        app: [
            './app.jsx',
            './styles/style.sass',
        ],
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: "babel-loader",
             query: {
                 presets: [
                        "react",
                        "es2015",
                        "stage-1"
                  ],
                 plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.s[a,s]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        },
                    ],
                    fallback: 'style-loader',
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../',
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../',
                            name: '[path][name].[ext]',
                        },
                    }
                ],
            },
        ]

    },

    resolve: {
        extensions: ['.js', '.css'],
    },

    plugins: [
        new CleanWebpackPlugin(['public']),

        new CopyWebpackPlugin(
            [
                { from: path.join(__dirname, 'src') + '/img', to: 'img' },
            ]
        ),

        new ExtractTextPlugin(
            'styles/[name].css'
        ),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),

        new Html({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: path.join(__dirname, 'public', 'index.html')
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8090,
            server: {
                baseDir: ['public']
            }
        })
    ]
};