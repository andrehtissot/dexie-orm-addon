const configurations = require('./karma.common')

module.exports = function(config) {
    configurations.browsers = ['Edge']
    configurations.plugins.push('karma-edge-launcher')
    configurations.files.push('dist/DexieORMAddon.js')
    configurations.files.push('test/tmp/tests.js')
    config.set(configurations)
}
