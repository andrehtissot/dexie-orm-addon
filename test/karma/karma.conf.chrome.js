const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'Chrome' ]
    configurations.plugins.push('karma-chrome-launcher')
    config.set(configurations)
}
