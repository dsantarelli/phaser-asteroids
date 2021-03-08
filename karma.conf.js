module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'karma-typescript'],
    files: [
      'node_modules/phaser/dist/phaser.min.js',
      { pattern: 'assets/**/*', included: false, watched: true, served: true },
      'test/**/*.ts',
      'src/**/*.ts'
    ],
    exclude: [
      'src/main.ts'
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
      'src/**/*.ts': ['coverage']
    },
    reporters: ['progress', 'karma-typescript', 'mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        {
          type: 'html',
          dir: 'coverage/',
          subdir: 'html'
        },
        {
          type: 'lcov',
          dir: 'coverage/',
          subdir: 'lcov'
        },
        {
          type: 'lcovonly',
          subdir: '.',
          file: 'report-lcovonly.txt'
        },
        {
          type: 'cobertura',
          dir: 'coverage/',
          subdir: '.',
          file: 'cobertura.xml'
        },
        {
          type: 'teamcity',
          dir: 'coverage/',
          subdir: '.',
          file: 'teamcity.txt'
        },
        {
          type: 'text',
          dir: 'coverage/',
          subdir: '.',
          file: 'text.txt'
        },
        {
          type: 'text-summary',
          dir: 'coverage/',
          subdir: '.',
          file: 'text-summary.txt'
        }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome', 'ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    autoWatch: false,
    concurrency: Infinity,
    client: {
      mocha: {
        delay: true
      }
    }
  })
}