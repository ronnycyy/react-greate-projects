const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: path.join(__dirname, '../src/client/index.tsx'),
    output: {
        filename: 'scripts/[name].bundle.js',
        publicPath: '/',
        path: path.join(__dirname, '../dist/assets')
    },
    module: {
        rules: [{
            test: /\.ts(x)?/,
            use: ['babel-loader']
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'layout.html',
            template: path.resolve(__dirname, '../src/client/template/layout.html')
        })
    ]
}