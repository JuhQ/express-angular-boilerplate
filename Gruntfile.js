module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'routes/*.js', 'public/**/*.js', '!public/js/build.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        boss: true,
        browser: true,
        globals: {
          jQuery: true
        }
      }
    },
    coffee: {
      options: {
        bare: true
      },
      glob_to_multiple: {
        expand: true,
        cwd: 'coffeescript',
        src: ['**/*.coffee'],
        dest: '',
        ext: '.js'
      }
    },
    coffeelint: {
      app: ['coffeescript/**/*.coffee'],
      options: {
        'max_line_length': {
          'value': 140
        }
      }
    },
    less: {
      glob_to_multiple: 
        {
          expand: true,
          cwd: 'less',
          src: ['**/*.less', '!mixins.less'],
          dest: 'public/css/',
          ext: '.css'
        }
    },
    watch: {
      coffee: {
        files: ['coffeescript/**/*.coffee'],
        tasks: ['coffee', 'ngtemplates', 'concat']
      },
      templates: {
        files: ['public/views/**/*'],
        tasks: ['ngtemplates', 'concat']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less']
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/js/**/*.js', '!public/js/build.js'],
        dest: 'public/js/build.js'
      }
    },
    ngtemplates: {
      app: {
        options: {
          module: 'app',
          url: function(url) {
            return url.replace('public/views/', '');
          },
          htmlmin: {
            removeComments: true,
            collapseWhitespace: true
          }
        },
        src: ['public/views/*.html', 'public/views/*/*.html'],
        dest: 'public/js/templates.js'
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      build: {
        files: {
          'public/js/build.js': 'public/js/build.js'
        }
      }
    },
    ngmin: {
      app: {
        src: 'public/js/build.js',
        dest: 'public/js/build.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-ngmin');

  // Default task(s).
  grunt.registerTask('default', ['less', 'coffeelint', 'coffee', 'jshint', 'ngtemplates', 'concat']);

  grunt.registerTask('build', ['ngmin', 'uglify']);

};