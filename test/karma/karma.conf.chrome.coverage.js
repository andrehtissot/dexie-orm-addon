const configurations = require('./karma.common')

module.exports = function (config) {
    configurations.reporters.push('coverage')
    configurations.singleRun = true
    configurations.browsers = [ 'Chrome' ]
    configurations.preprocessors = {
      'dist/DexieORMAddon.es6.js': ['coverage']
    }
    configurations.coverageReporter = {
      type: 'lcovonly',
      dir: 'coverage/',
      subdir: './'
    }
    configurations.files.push('dist/DexieORMAddon.es6.js')
    configurations.files.push('test/tmp/tests.es6.js')
    configurations.plugins.push('karma-chrome-launcher')
    configurations.plugins.push('karma-coverage')
    config.set(configurations)
}
