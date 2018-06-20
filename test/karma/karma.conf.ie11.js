const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'IE' ]
    configurations.files.push('dist/DexieORMAddon.ie11up.js')
    configurations.files.push('test/tmp/tests.ie11up.js')
    configurations.plugins.push('karma-ie-launcher')
    config.set(configurations)
}
