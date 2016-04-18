var HTML = require('html-webpack-plugin');

var HTMLConfig = new HTML({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body',
}); 

module.exports = {
    entry: __dirname + '/app/index.js',
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },

    output: {
        filename: 'app.js',
        path: __dirname + '/public',
    },

    plugins: [
        HTMLConfig,
    ]
};
