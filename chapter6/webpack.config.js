var path = require('path');

module.exports = {
    entry: {
      main: './build/js/main.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '../build/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js?',
        hash: true
    }
};