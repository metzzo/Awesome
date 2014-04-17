module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'curl-dir': {
      'src/lib/js': [
        
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
          port: 8083,
          base: 'src',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-doctool');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', [ ]);
  grunt.registerTask('deps', [ 'curl-dir' ]);
  grunt.registerTask('http', [ 'connect' ]);
  grunt.registerTask('doc', [ 'jsdoc' ]);
};
