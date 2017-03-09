module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        logLevel: "DEBUG",
        captureConsole: true,

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],

        reporters: ['progress', 'coverage'],

        preprocessors: {"src/**/*.js": ["coverage"]},
        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'lcov', subdir: 'report-lcov' }
            ]
        }
    });
};