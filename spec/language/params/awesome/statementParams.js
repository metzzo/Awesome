define([], function() {
  return [
    {
      name: 'if',
      input: [
        'if true',
        '  compiletest "if"',
        'else if false',
        'end',
        'if false',
        'else if true',
        '  compiletest "elseif"',
        'else',
        'end',
        'if false',
        'else if false',
        'else',
        '  compiletest "else"',
        'end',
        'if true compiletest "1 line"'
      ],
      output: ['if', 'elseif', 'else', '1 line']
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