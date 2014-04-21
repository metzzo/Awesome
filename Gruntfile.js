module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'curl-dir': {
      'src/lib/js': [
        'http://underscorejs.org/underscore.js',
        'http://epeli.github.io/underscore.string/lib/underscore.string.js'
      ],
      'src/lib/css': [
        
      ],
      'src/lib/fonts': [
        
      ]
    },
    jsdoc : {
      dist : {
        src: [
          './src/app/js/**/*.js',
        ],
        options: {
          destination: 'doc/jsdoc'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8082,
          // keepalive: true
        }
      }
    },
    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/**/*Spec.js',
        template: require('grunt-template-jasmine-requirejs'),
        host: 'http://127.0.0.1:8082/',
        keepRunner: true,
        summary: false,
        templateOptions: {
          requireConfig: {
            baseUrl: './',
            paths: {
              'underscore': 'src/lib/js/underscore',
              'underscore.string': 'src/lib/js/underscore.string'
            },
            shim: {
              'underscore': {
                exports: '_'
              },
              'underscore.string': {
                deps: ['underscore']
              }
            }
          }
        }
      }
    },
    watch: {
      test: {
        files: ['spec/**/*.js', 'src/**/*.js', 'Gruntfile.js'],
        tasks: ['test']
      }
    },
    jsvalidate: {
      options:{
        globals: {},
        esprimaOptions: {},
        verbose: false
      },
      targetName:{
        files:{
          src:['spec/**/*.js', 'src/**/*.js']
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      all: ['Gruntfile.js', 'src/app/**/*.js', 'spec/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', [ 'jsvalidate', 'jshint', 'connect', 'jasmine' ]);
  grunt.registerTask('deps', [ 'curl-dir' ]);
  grunt.registerTask('http', [ 'connect' ]);
  grunt.registerTask('doc', [ 'jsdoc' ]);
  grunt.registerTask('test', [ 'jsvalidate', 'connect', 'jasmine' ]);
  grunt.registerTask('watchtest', ['watch:test']);
};
