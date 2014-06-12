define([], function() {
  return [
    {
      name: 'if',
      input: [
        'if true',
        '  compiletest "if"',
        'else if false',
        '  compiletest "not here"',
        'else',
        '  compiletest "not here"',
        'end',
        'if false',
        'else if true',
        '  compiletest "elseif"',
        'else',
        '  compiletest "not here"',
        'end',
        'if false',
        '  compiletest "not here"',
        'else if false',
        '  compiletest "not here"',
        'else',
        '  compiletest "else"',
        'end',
        'if true compiletest "1 line"'
      ],
      output: ['if', 'elseif', 'else', '1 line']
    },
    {
      name: 'while',
      input: [
        'while false',
        'compiletest "not here"',
        'end',
        'compiletest "here"',
        'var i is int = 3',
        'while i > 0',
        '  compiletest i',
        '  i = i - 1',
        'end'
      ],
      output: ['here', 3, 2, 1]
    },
    {
      name: 'repeat',
      input: [
        'repeat',
        'compiletest "here"',
        'until true',
        'compiletest "here"',
        'var i is int = 3',
        'repeat',
        '  compiletest i',
        '  i = i - 1',
        'until i == 0'
      ],
      output: [ 'here', 'here', 3, 2, 1 ]
    },
    {
      name: 'compiles cyclic imports',
      input: [
        'import a',
        'import b',
        'func_a',
        'func_b'
      ],
      setup: function(awesome) {
        awesome.addFile('a', 'import b ; import compiletest_module ; func_b \n function func_a() \n compiletest "a" \n end');
        awesome.addFile('b', 'import a ; import compiletest_module ; func_a \n function func_b() \n compiletest "b" \n end');
      },
      output: ['a', 'b', 'a', 'b']
    }
  ]
});