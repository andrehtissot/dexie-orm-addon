const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'Opera' ]
    configurations.plugins.push('karma-opera-launcher')
    configurations.files.push('dist/DexieORMAddon.js')
    configurations.files.push('test/tmp/tests.js')
    config.set(configurations)
}

