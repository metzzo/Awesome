module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'curl-dir': {
      'src/lib/js': [
        'http://underscorejs.org/underscore.js',
        'http://epeli.github.io/underscore.string/lib/underscore.string.js',
        'https://raw.github.com/dragonworx/jsel/master/jsel.js',
        'http://fb.me/react-0.10.0.js',
        'http://code.jquery.com/jquery-1.11.1.js',
        'http://requirejs.org/docs/release/2.1.11/comments/require.js',
        'http://requirejs.org/docs/release/1.0.8/comments/text.js'
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
          keepalive: true
        }
      }
    },
    jasmine: {
      src: 'src/app/compiler/**/*.js',
      options: {
        specs: 'spec/**/*Spec.js',
        template: require('grunt-template-jasmine-requirejs'),
        host: 'http://127.0.0.1:8082/',
        keepRunner: true,
        summary: false,
        templateOptions: {
          requireConfigFile: 'src/app/config.js'
        }
      }
    },
    watch: {
      test: {
        files: ['spec/**/*.js', 'src/**/*.js', 'Gruntfile.js'],
        tasks: ['test']
      },
      all: {
        files: ['spec/**/*.js', 'src/**/*.js', 'Gruntfile.js', 'src/**/*.jsx'],
        tasks: ['default']
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
    },
    react: {
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'src/app/editor/',
            src: ['**/*.jsx'],
            dest: 'src/app/editor/gen/',
            ext: '.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('default', [ 'react', 'jsvalidate', /*'jshint', 'connect',*/ 'jasmine' ]);
  grunt.registerTask('deps', [ 'curl-dir' ]);
  grunt.registerTask('http', [ 'connect' ]);
  grunt.registerTask('doc', [ 'jsdoc' ]);
  grunt.registerTask('test', [ 'jsvalidate', 'jasmine'/*, 'connect'*/]);
  
  grunt.registerTask('watchtest', ['watch:test']);
  grunt.registerTask('watcheditor', ['watch:all']);
};
