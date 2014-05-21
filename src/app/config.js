require.config({
  baseUrl: './',
  paths: {
    'underscore': 'src/lib/js/underscore',
    'underscore.string': 'src/lib/js/underscore.string',
    'react': 'src/lib/js/react-0.10.0',
    'jquery': 'src/lib/js/jquery-1.11.1'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'underscore.string': {
      deps: ['underscore']
    },
    'src/lib/js/react-0.10.0': {
      exports: 'React'
    },
    'src/lib/js/jquery-1.11.1': {
      exports: '$'
    },
    'src/lib/js/jsel': {
      exports: 'jsel'
    }
  }
});