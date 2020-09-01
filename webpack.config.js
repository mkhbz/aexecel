const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    // 扩展名
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },
    // 添加source-map
    devtool: 'source-map',
    // 入口文件
    entry: {
        index: './src/index.ts',
    },
    // 打包出来的文件
    output: {
        filename: '[name].js',// 生成的fiename需要与package.json中的main一致
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
    },
    // loader
    module: {
        rules: [
            // 对ts/tsx文件使用tslint-loader
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tslint.js'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            // 对ts/tsx文件使用tsconfig.json
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    // plugins
    plugins: [new CleanWebpackPlugin()],
};