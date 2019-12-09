const path = require('path');

module.exports = {
    entry: './frontend/index.jsx',
    output: {
        path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/env', '@babel/react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'resolve-url-loader'],
                include: [
                    path.join(__dirname, 'src'),
                    /node_modules/
                ],
            },
            {
                test: /\.(woff(2)?|eot|otf|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: path.resolve(__dirname, '../../app/assets'),
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        useRelativePath: false
                    }
                }
            },
            {
                test: /\.(png|jpg(eg)?|gif|ico)$/,
                exclude: path.resolve(__dirname, '../../app/assets'),
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                        useRelativePath: false
                    }
                }
            }

        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '*'],
    }
};
