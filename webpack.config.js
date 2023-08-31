const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'eval',
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
            new HtmlMinimizerPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg|gif|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[contenthash][ext]',
                }
            },
        ]
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        liveReload: true,
        port: 4200,
        open: true,
        hot: true,
        compress: true,
    },
}
