module.exports = function (grunt) {

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            banner: '/*\n' +
            '* <%= pkg.name %> v.<%= pkg.version %>\n' +
            '* Obogo.' + new Date().getFullYear() + '\n' +
            '*/\n',
            jshint: {
                // define the files to lint
                files: ['src/**/*.js'],
                // configure JSHint (documented at http://www.jshint.com/docs/)
                options: {
                    // more options here if you want to override JSHint defaults
                    globals: {
                        loopfunc: false
                    },
                    ignores: ['src/vendor/**']
                }
            },
            jasmine: {
                pivotal: {
                    src: 'src/**/*.js',
                    options: {
                        specs: 'tests/*_spec.js'
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', [
        'jshint',
        'jasmine'
    ]);

};