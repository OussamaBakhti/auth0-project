module.exports = [
    {
        name: 'server',
        entry: './index.js',
        target: 'node',
        output: {
            path: __dirname + '/dist/server',
            filename: 'bundle.js',
        },
    }
];