const configurations = require('./karma.common')

module.exports = function(config) {
    configurations.browsers = ['OperaCustom']
    configurations.plugins.push('karma-opera-launcher')
    configurations.files.push('dist/DexieORMAddon.js')
    configurations.files.push('test/tmp/tests.js')
    if (configurations.customLaunchers === undefined) {
        configurations.customLaunchers = {}
    }
    configurations.customLaunchers.OperaCustom = {
        base: 'Opera',
        flags: ['--ran-launcher'],
    }
    config.set(configurations)
}
