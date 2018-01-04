const configurations = require('./karma.common');

module.exports = function (config) {
    configurations.browsers = [ 'Firefox' ]
    configurations.plugins.push('karma-firefox-launcher')
    config.set(configurations)
}
