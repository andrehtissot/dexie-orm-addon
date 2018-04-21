const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'IE' ]
    configurations.plugins.push('karma-ie-launcher')
    config.set(configurations)
}
