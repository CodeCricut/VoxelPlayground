const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js',
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'docs'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'HTML Webpack Test',
            template: 'index.html',
            filename: './index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // Adds CSS to the DOM by injecting a `<style>` tag
                    'style-loader',
                    // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },

            // For bootstrap, https://stevenwestmoreland.com/2018/01/how-to-include-bootstrap-in-your-project-with-webpack.html
            {
                test: /\.(scss)$/,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader',
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader',
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')];
                            },
                        },
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
};
