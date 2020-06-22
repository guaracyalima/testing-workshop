// Karma configuration
// // Generated on Fri Jun 19 2020 18:48:58 GMT-0300 (Horário Padrão de Brasília)
const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      'node_modules/@babel/polyfill/dist/polyfill.js',
      'app/src/**/*.js',
      'app/spec/**/*.spec.js'
    ],

    exclude: [
    ],

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-babel-preprocessor',
      'karma-coverage-istanbul-reporter',
      'karma-browserify'
    ],

    preprocessors: {
      'app/src/**/*.js': ['babel', 'browserify', 'coverage'],
      'app/spec/**/*.js': ['babel', 'browserify']

    },

    babelPreprocessor: {
        options: {
          presets: ['@babel/preset-env']
        }
    },
    browserify: {
          plugin: ['proxyquireify/plugin']
        },
    coverageReporter: {
      type : 'cobertura',
      dir : 'coverage/'
    },

    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),

      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,

      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // Omit files with no statements, no functions and no branches covered from the report
      skipFilesWithNoCoverage: true,

      // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {
        // all options available at: https://github.com/istanbuljs/istanbuljs/blob/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib/html/index.js#L257-L261
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      },

      // enforce percentage thresholds
      // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        },
        // thresholds per file
        each: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100,
          overrides: {
            'app/**/*.js': {
              statements: 98
            }
          }
        }
      },

      verbose: true // output config used by istanbul for debugging
    },
    reporters: ['progress', 'coverage', 'coverage-istanbul'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: Infinity
  })
}
