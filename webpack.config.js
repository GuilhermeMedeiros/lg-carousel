'use strict';

module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist',
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.js?$/, loader: 'babel', exclude: /(node_modules)/}
        ]
    }
};