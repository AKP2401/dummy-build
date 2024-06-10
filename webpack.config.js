const path = require('path');
const webpack = require('webpack');
const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
const { jsx } = require('react/jsx-runtime');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const model = process.env.REACT_APP_MODEL;
    console.log(model)
    return {
        mode: "development",
        entry: './src/index.js',
        stats: {
            colors: true,
            reasons: true,
            chunks: true,
            chunkModules: true,
            chunkOrigins: true,
            depth: true,
            usedExports: true,
            providedExports: true,
            optimizationBailout: true,
            errorDetails: true,
            publicPath: true,
            performance: true,
            moduleTrace: true,
            logging: 'verbose', // Enable verbose logging
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'), // The directory from which static files will be served
            },
            port: 3000, // Port number for the webpack-dev-server
            open: true, // Open the browser after the server has been started
            hot: true, // Enable Hot Module Replacement
            historyApiFallback: true, // Fallback to index.html for Single Page Applications.
            compress: true, // Enable gzip compression 
        },
        plugins: [
            new DefinePlugin({
                'process.env.REACT_APP_MODEL': JSON.stringify(model) || "jsg"
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html', // Adjust if your HTML file is located elsewhere
                publicPath: '/'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext][query]'
                    },
                    include: [
                        path.resolve(__dirname, `src/images/${model}/`),
                    ]
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,

                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                // other rules
            ]
        },
        // other configurations
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
    };
};