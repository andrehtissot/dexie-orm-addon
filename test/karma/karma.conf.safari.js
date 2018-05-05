const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'Safari' ]
    configurations.plugins.push('karma-safari-launcher')
    configurations.files.push('test/karma/karma-env.safari.js')
    configurations.files.push('dist/DexieORMAddon.js')
    configurations.files.push('test/tmp/tests.js')
    config.set(configurations)
}

