module.exports = function(grunt) {

// Load multiple grunt tasks using globbing patterns
require('load-grunt-tasks')(grunt);

// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

    makepot: {
      target: {
        options: {
          domainPath: '/languages/',             // Where to save the POT file.
          exclude: ['build/.*'],                 // Exlude build folder.
          potFilename: 'eemeli.pot',             // Name of the POT file.
          type: 'wp-theme',                      // Type of project (wp-plugin or wp-theme).
          updateTimestamp: false,                // Whether the POT-Creation-Date should be updated without other changes.
          processPot: function( pot, options ) {
            pot.headers['report-msgid-bugs-to'] = 'https://foxland.fi/contact/';
			pot.headers['language'] = 'en_US';
            return pot;
          }
        }
      }
    },

	// Right to left styles
	rtlcss: {
		options: {
			// rtlcss options  
			config:{
				swapLeftRightInUrl: false,
				swapLtrRtlInUrl: false,
				autoRename: false,
				preserveDirectives: true,
				stringMap: [
					{
						name: 'import-rtl-stylesheet',
						search: [ '.css' ],
						replace: [ '-rtltest.css' ],
						options: {
							scope: 'url',
							ignoreCase: false
						}
					}
				]
			},
			// extend rtlcss rules
			//rules:[],
			// extend rtlcss declarations
			//declarations:[],
			// extend rtlcss properties
			//properties:[],
			// generate source maps
			//map: false,
			// save unmodified files
			saveUnmodified: true,
		},
		theme: {
			expand : true,
			//cwd    : '/',
			//dest   : '/',
			ext    : '-rtl.css',
			src    : [
				'style.css'
			]
		}
	},
	
	// Minify files
	uglify: {
		responsivenav: {
			files: {
				'js/responsive-nav.min.js': ['js/responsive-nav.js'],
				'js/settings.min.js': ['js/settings.js']
			}
		},
		fluidvids: {
			files: {
				'js/fluidvids/fluidvids.min.js': ['js/fluidvids/fluidvids.js'],
				'js/fluidvids/settings.min.js': ['js/fluidvids/settings.js']
			}
		},
		settigns: {
			files: {
				'js/functions.min.js': ['js/functions.js'],
				'js/customizer.min.js': ['js/customizer.js']
			}
		}
	},
	
	// Minify css
	cssmin : {
		css: {
			src: 'style.css',
			dest: 'style.min.css'
		},
		cssrtl: {
			src: 'style-rtl.css',
			dest: 'style-rtl.min.css'
		},
		genericons: {
			src: 'fonts/genericons/genericons/genericons.css',
			dest: 'fonts/genericons/genericons/genericons.min.css'
		}
	},

    // Clean up build directory
    clean: {
      main: ['build/<%= pkg.name %>']
    },

    // Copy the theme into the build directory
    copy: {
      main: {
        src:  [
          '**',
          '!node_modules/**',
          '!build/**',
          '!.git/**',
          '!Gruntfile.js',
          '!package.json',
          '!.gitignore',
          '!.gitmodules',
          '!.tx/**',
          '!**/Gruntfile.js',
          '!**/package.json',
          '!**/*~',
		  '!style-rtl.css'
        ],
        dest: 'build/<%= pkg.name %>/'
      }
    },
	
	// Replace text
	replace: {
		styleVersion: {
			src: [
				'style.css',
			],
			overwrite: true,
			replacements: [ {
				from: /^.*Version:.*$/m,
				to: 'Version: <%= pkg.version %>'
			} ]
		},
		functionsVersion: {
			src: [
				'functions.php'
			],
			overwrite: true,
			replacements: [ {
				from: /^define\( 'EEMELI_VERSION'.*$/m,
				to: 'define( \'EEMELI_VERSION\', \'<%= pkg.version %>\' );'
			} ]
		}
	},

    // Compress build directory into <name>.zip and <name>-<version>.zip
    compress: {
      main: {
        options: {
          mode: 'zip',
          archive: './build/<%= pkg.name %>_v<%= pkg.version %>.zip'
        },
        expand: true,
        cwd: 'build/<%= pkg.name %>/',
        src: ['**/*'],
        dest: '<%= pkg.name %>/'
      }
    },

});

// Default task.
grunt.registerTask( 'default', [ 'makepot' ] );

// Build task(s).
grunt.registerTask( 'build', [ 'clean', 'replace:styleVersion', 'copy', 'compress' ] );

};