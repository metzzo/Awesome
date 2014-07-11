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
    },
    {
      name: 'fibonacci',
      input: [
        'var current = 5', 
        'while current >= 0', 
        '  compiletest fibonacci(current)', 
        '  current = current - 1', 
        'end', 
        'function fibonacci(n)', 
        '  if n <= 1', 
        '    return n', 
        '  else', 
        '    return fibonacci(n-1) + fibonacci(n-2)', 
        '  end', 
        'end'
      ],
      output: [
        5, 3, 2, 1, 1, 0
      ]
    },
    {
      name: 'automatic duck typing of functions',
      input: [
        'foo 10',
        'foo 10.4',
        'function foo(bar)',
        '  if bar > 10',
        '    compiletest bar',
        '  end',
        'end'
      ],
      output: [
        10.4
      ]
    }
  ];
});