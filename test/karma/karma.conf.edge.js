const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'Edge' ]
    configurations.plugins.push('karma-edge-launcher')
    config.set(configurations)
}
