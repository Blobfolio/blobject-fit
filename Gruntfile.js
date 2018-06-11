/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),

		// Javascript.
		eslint: {
			check: {
				src: ['src/blobject-fit.js'],
			},
			fix: {
				options: {
					fix: true,
				},
				src: ['src/blobject-fit.js'],
			}
		},
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
		// Watch.
		watch: {
			scripts: {
				files: ['src/*.js'],
				tasks: ['javascript', 'notify:js'],
				options: {
					spawn: false
				},
			}
		},
		// Notify.
		notify: {
			js: {
				options: {
					title: "JS Files Built",
					message: "Uglify and JSHint task complete"
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-notify');

	//tasks
	grunt.registerTask('javascript', ['eslint', 'uglify']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};
