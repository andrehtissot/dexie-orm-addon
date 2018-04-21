const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'Opera' ]
    configurations.plugins.push('karma-opera-launcher')
    config.set(configurations)
}

