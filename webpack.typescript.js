var path = require('path');

module.exports = {
    entry: {
        'project': './src/babylon-extension.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'babylon-3dRudder.js',
        libraryTarget: 'commonjs',
        library: 'BABYLON3dRudder'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [

    ],
    externals: ['ws', 'babylonjs'],
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}