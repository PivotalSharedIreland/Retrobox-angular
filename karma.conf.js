module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: false},
            {pattern: 'node_modules/systemjs/dist/system.js', included: true, watched: false},
            {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: false},
            {pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: false},
            {pattern: 'node_modules/angular2/bundles/http.dev.js', included: true, watched: false},
            {pattern: 'node_modules/angular2/bundles/router.dev.js', included: true, watched: false},
            {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: false},

            {pattern: 'karma-test-shim.js', included: true, watched: false},

            {pattern: 'build/**/*.js', included: false, watched: true},
            {pattern: 'src/**/*.ts', included: false, watched: false},
            {pattern: 'build/**/*.js.map', included: false, watched: false}
        ],

        // proxied base paths
        proxies: {
            // required for component assets fetched by Angular's compiler
            '/src/app/': '/base/build/app/'
        },

        captureTimeout: 60000,
        browserDisconnectTimeout: 10000, // default 2000
        browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 60000, //default 10000

        port: 9876,

        logLevel: config.LOG_INFO,

        colors: false,

        autoWatch: true,

        // customLaunchers: {
        //     Chrome_travis_ci: {
        //         base: 'Chrome',
        //         flags: ['--no-sandbox']
        //     }
        // },

        browsers: ['Firefox'],

        // Karma plugins loaded
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],

        // list of files to exclude
        exclude: [
            'node_modules/angular2/**/*spec.js'
        ],
        
        reporters: ['progress']
    })
};