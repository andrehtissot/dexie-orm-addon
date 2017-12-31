const {karmaCommon, getKarmaConfig, defaultBrowserMatrix} = require('./karma.common');

module.exports = function (config) {
  const cfg = getKarmaConfig (defaultBrowserMatrix, {
    // Base path should point at the root
    basePath: '../..',
    // Files to include
    files: karmaCommon.files.concat([
      'dist/dexieORMWrapper.js',
      'test/tmp/tests.js',
      { watched: true, included: false, served: true, pattern: 'test/worker.js' },
    ])
  });

  config.set(cfg);
}
