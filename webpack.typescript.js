var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: {
        'project': './src/babylon-extension.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'babylon-3dRudder.js',
        libraryTarget: 'umd',
        library: 'BABYLON3dRudder',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.IgnorePlugin(/^ws$/)
    ],
    externals: [        
        {"babylonjs": {
            root: "BABYLON",
            commonjs2: "babylonjs",
            commonjs: ["babylonjs"],
            amd: "babylonjs"
        }}
    ],
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}