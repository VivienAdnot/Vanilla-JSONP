module.exports = function (grunt) {
    var appName = "jsonp";
    var testsName = "tests";
    
    var build = {
        app: [
            // appName + '*.js',
            appName + '/**/*.js'
        ],
        
        tests: [
            testsName + '/utils/**/*.js',
            testsName + '/qunit/**/*.js'
        ]
    };
    
    var path = {
        app: {
            build: '_dist/' + appName + '.js',
            buildmin: '_dist/' + appName + '.min.js'
        },
        tests: {
            source: testsName + '/_source/' + appName + '.js',
            build: testsName + '/_build/tests.js'
        }
    };
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            options: {
                separator: '\n\n',
                punctuation: ''
            },
            dispatchAppBuild: {
                files: {
                    '<%= testsName %>/_source/<%= appName %>.js': [path.app.build]
                }
            }
        },
        concat: {
            options: {
                separator: '\n\n'
            },
            buildApplication: {
                src: build.app,
                dest: path.app.build
            },
            buildApplicationTests: {
                src: build.tests,
                dest: path.tests.build
            }            
        },       
        uglify: {
            build: {
                src: path.app.build,
                dest: path.app.buildmin
            }
        },
        connect: {
            server: {
                options: {
                    port: 4242,
                    hostname: '127.0.0.1',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('loadEnv', 'Load environment variables', function () {
        // common
        grunt.config('appName', appName);
        grunt.config('testsName', testsName);
    });

    //=======================================================================
    // unit tests
    //=======================================================================

    //use playtem localhost url
    grunt.registerTask('default', [
        'loadEnv',
        // application
        'concat:buildApplication','copy:dispatchAppBuild','uglify',
        // applicationTests
        'concat:buildApplicationTests',
        // run http server
        'connect:server'
    ]); 
};