module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/factorial.js',
                dest: 'build/factorial.min.js'
            }
        },
        ngconstant: {
            // Options for all targets
            options: {
                space: '  ',
                wrap: '"use strict";\n\n {%= __ngModule %}',
                name: 'envConfig',
            },
            build: {
                options: {
                    dest: 'client/app/common/envConfig.js'
                },
                constants: {
                    ENV: {
                        name: 'prod',
                        blogcastApiUrl: process.env.BLOGCAST_URL,
                        blogcastApiKey: process.env.BLOGCAST_KEY
                    }
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['ngconstant:build']);
};