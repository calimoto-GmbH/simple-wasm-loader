const path = require('path')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')

module.exports = function (entry) {
    const compiler = webpack({
        context: __dirname,
        entry: entry,
        output: {
            path: path.resolve(__dirname),
            filename: 'bundle.js'
        },
        mode: 'none',
        module: {
            rules: [{
                test: /\.wasm$/,
                type: 'javascript/auto',
                use: [
                    {
                        loader: path.resolve(__dirname, '../src/index.js'),
                    }
                ]
            }]
        }
    });
    compiler.outputFileSystem = new MemoryFS();
    return new Promise(function (resolve, reject) {
        compiler.run(function (error, stats) {
            return error ? reject(error) : resolve(stats);
        });
    });
}