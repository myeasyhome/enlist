
const path = require('path');

module.exports = {
    entry: {
        createWorkspace: './static/components/workspace-maker.jsx'
    },
    output: {
        path: path.resolve(__dirname, './static/bundles'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test:  /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
}