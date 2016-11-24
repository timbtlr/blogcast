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
                        blogcastApiKey: process.env.BLOGCAST_KEY,
                        awsAccessKey: process.env.AWS_ACCESS_KEY,
                        awsSecretKey: process.env.AWS_SECRET_KEY,
                        awsBucketName: process.env.AWS_BUCKET_NAME
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