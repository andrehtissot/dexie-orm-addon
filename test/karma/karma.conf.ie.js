const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'IE' ]
    configurations.plugins.push('karma-ie-launcher')
    configurations.files.push('dist/DexieORMAddon.js')
    configurations.files.push('test/tmp/tests.js')
    config.set(configurations)
}
