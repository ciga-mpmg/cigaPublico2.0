const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: [
                            '**/*.scss',
                            '**/*.css',
                            '**/*.json',
                            '**/*.txt',
                        ],
                    },
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    entry: {
        ciga: './src/stylesheets/styles.scss',
    },
    output: {
        path: path.resolve(__dirname, `./dist/`),
        filename: '[name].js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3333,
        open: true,
        liveReload: true,
        host: '192.168.1.167',
    },
};
