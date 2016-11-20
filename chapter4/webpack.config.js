var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        js: [
            "webpack-dev-server/client?http://localhost:8080/", // hot module replacement 적용
            'webpack/hot/dev-server',
            "./js/app.js"
        ],
        html: "./index.html"
    },
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: "babel",
                exclude: /node_modules/
            },
            {
                test: /\.(html|png)$/,
                loader: 'file?name=[name].[ext]',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        filename: "bundle.js",
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: {color: true, progress:true, watch:true}
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    // 원래 소스에서 디버깅이 가능하게 함.
    devtool: "source-map"
};
