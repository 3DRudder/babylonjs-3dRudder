var path = require('path');

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

    ],
    externals: [
        {"3drudder-js": {
            root: "Sdk3dRudder",
            commonjs2: "3drudder-js",
            commonjs: ["3drudder-js"],
            amd: "3drudder-js"
        }},
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