module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        logLevel: "DEBUG",
        captureConsole: true,

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