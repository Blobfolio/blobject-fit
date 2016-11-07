/*global module:false*/
module.exports = function(grunt) {

	//Project configuration.
	grunt.initConfig({
		//Metadata.
		pkg: grunt.file.readJSON('package.json'),

		//JS HINT
		jshint: {
			all: ['src/blobject-fit.js']
		},

		//JS COMPRESSION
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'blobject-fit.min.js': ['src/blobject-fit.js']
				}
			}
		},

		//WATCH
		watch: {
			scripts: {
				files: ['src/*.js'],
				tasks: ['javascript', 'notify:js'],
				options: {
					spawn: false
				},
			}
		},

		//NOTIFY
		notify: {
			js: {
				options: {
					title: "JS Files Built",
					message: "Uglify and JSHint task complete"
				}
			}
		}
	});

	//These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-notify');

	//tasks
	grunt.registerTask('javascript', ['jshint', 'uglify']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};