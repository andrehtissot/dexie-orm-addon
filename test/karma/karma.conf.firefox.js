const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'Firefox' ]
    configurations.plugins.push('karma-firefox-launcher')
    configurations.files.push('dist/DexieORMAddon.js')
    configurations.files.push('test/tmp/tests.js')
    config.set(configurations)
}
