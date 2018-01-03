module.exports = function (config) {
    const testWithChrome = true
    config.set({
        frameworks: [
            'qunit'
        ],
        reporters: [
            'mocha'
        ],
        client: {
            captureConsole: false
        },
        port: 19144,
        colors: true,
        browserNoActivityTimeout: 2 * 60 * 1000,
        plugins: [
            'karma-qunit',
            'karma-mocha-reporter',
            testWithChrome ? 'karma-chrome-launcher' : 'karma-firefox-launcher'
        ],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            'node_modules/qunitjs/qunit/qunit.js',
            'node_modules/dexie/dist/dexie.js',
            'test/karma/karma-env.js',
            { pattern: 'test/worker.js', watched: true, included: false, served: true },
            { pattern: '!(node_modules|tmp)*/*.map', watched: false, included: false, served: true },
            'dist/dexieORMWrapper.js',
            'test/tmp/tests.js',
            { watched: true, included: false, served: true, pattern: 'test/worker.js' }
        ],
        basePath: '../..',
        browsers: [ testWithChrome ? 'Chrome' : 'Firefox' ]
    })
}
