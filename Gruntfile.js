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
                    except: ['window', 'document']
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
        }
    })

    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-mocha-phantomjs')
    grunt.registerTask('test', ['jshint', 'mocha_phantomjs'])
    grunt.registerTask('build', 'uglify')
    grunt.registerTask('default', ['test', 'build'])
}
