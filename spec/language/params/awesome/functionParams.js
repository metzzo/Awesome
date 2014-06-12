define([], function() {
  return [
    {
      name: 'anonymous functions are correctly type inferenced',
      input: ['var foo',
              'foo = function(bar)',
              '  compiletest bar',
              '  return 100',
              'end',
              'foo 10',
              '(function(bar)',
              '  return bar',
              'end)(10)'],
      output: [ 10 ]
    }
  ];
});