const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const defaults = require('@wordpress/scripts/config/webpack.config');


module.exports = {
    ...defaults,

    mode: "development",
    entry: {
        admin: './src/admin.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: './src/admin-template.html',
    //         filename: 'admin-template.php',
    //     }),
    // ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },

            },
        ],
    },
};