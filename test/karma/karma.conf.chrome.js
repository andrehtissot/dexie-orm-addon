const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'Chrome' ]
    configurations.plugins.push('karma-chrome-launcher')
    configurations.files.push('dist/DexieORMAddon.js')
    configurations.files.push('test/tmp/tests.js')
    config.set(configurations)
}
