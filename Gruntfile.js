module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: 'abrest.js'
        },
        uglify: {
            options: {
                report: 'gzip',
                preserveComments: false,
                mangle: {
                    except: ['window']
                },
            },
            build: {
                files: {
                    'abrest.min.js': 'abrest.js'
                }
            }
        },
        mocha_phantomjs: {
            options: {
                reporter: 'progress'
            },
            all: 'test/index.html'
        },
        cafemocha: {
            se2e: {
                src: 'test/node/init.js',
                options: {
                    ui: 'bdd',
                    reporter: 'progress',
                    require: [
                        'chai'
                    ],
                },
            },
        },
    })

    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-mocha-phantomjs')
    grunt.loadNpmTasks('grunt-cafe-mocha')
    grunt.registerTask('test', ['jshint', 'mocha_phantomjs', 'cafemocha'])
    grunt.registerTask('build', 'uglify')
    grunt.registerTask('default', ['test', 'build'])
}
