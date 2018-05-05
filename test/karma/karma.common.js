module.exports = {
    frameworks: [ 'qunit' ],
    reporters: [ 'mocha' ],
    client: { captureConsole: false },
    port: 19144,
    colors: true,
    browserNoActivityTimeout: 2 * 60 * 1000,
    plugins: [
        'karma-qunit',
        'karma-mocha-reporter'
    ],
    files: [
        'node_modules/babel-polyfill/dist/polyfill.min.js',
        'node_modules/dexie/dist/dexie.js',
        'test/karma/karma-env.js',
        { pattern: 'test/worker.js', watched: true, included: false, served: true },
        { pattern: '!(node_modules|tmp)*/*.map', watched: false, included: false, served: true },
        { watched: true, included: false, served: true, pattern: 'test/worker.js' }
    ],
    basePath: '../..',
}
