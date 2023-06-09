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
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[folder]/[name].[ext]',
                            outputPath: 'assets/fonts/',
                        },
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
            filename: 'pages/[name].css',
            chunkFilename: 'pages/[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/index.html',
            filename: 'pages/index.html',
            chunks: ['main', 'ciga', 'pages', 'home'],
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/sobre.html',
            filename: 'pages/sobre.html',
            chunks: ['main', 'ciga', 'pages'],
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/descaracterizacao.html',
            filename: 'pages/descaracterizacao.html',
            chunks: ['main', 'ciga', 'pages', 'descaracterizacao'],
        }),
    ],
    entry: {
        ciga: './src/stylesheets/styles.scss',
        pages: './src/stylesheets/pages/pages.scss',
        home: './src/stylesheets/pages/home.scss',
        descaracterizacao: './src/stylesheets/pages/descaracterizacao.scss',
        main: './src/javascripts/main.js',
    },
    output: {
        path: path.resolve(__dirname, `./dist/`),
        filename: 'pages/[name].js',
        clean: true,
    },
    performance: {
        hints: false,
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
