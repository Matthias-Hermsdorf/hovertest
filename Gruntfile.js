module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

       concat: {

            options: {
                separator: '\n;\n'
            },

            dist: {
                src: [
                    'bower_components/jquery/jquery.min.js',
                    'bower_components/jquery.transit/jquery.transit.js',
                    'private/js/*.js'
                ],
                dest: 'public/js/<%= pkg.name %>.js'
            }
        },

        less: {
			development: {
				
				options: {
					cleancss: false,
					compress: false,
				},

				files: {
					'public/css/hovertest.css': 'private/less/hovertest.less'
				}
			}
	   
        },

        watch: {

            less: {
                files: 'private/less/*.less',
                tasks: [
                    'css-dev'
                ]
            },

            js: {
                files: [
                    'private/js/*.js'
                ],
                tasks: [
                    'js-dev'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['js-dev', 'css-dev', 'watch']);
    grunt.registerTask('js-dev', ['concat']);
    grunt.registerTask('css-dev', ['less:development']);
};