define(['underscore.string', 'src/app/compiler/lexer/token', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/operator', 'src/app/compiler/syntaxError', 'src/app/compiler/errorMessages'], function(_s, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages) {
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstIf         = astModule.AstPrototypes.IF;
  var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
  
  return [
    {
      name: 'is parsing if',
      input: [ 'if', 'true', '\n', '1', '\n', 'end' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstIf, {
            cases: [
              {
                condition: astModule.createNode(AstBoolLit, { value: true }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1 })
                  ]
                })
              }
            ]
          })
        ]
      })
    },
    {
      name: 'is parsing if with then',
      input: [ 'if', 'true', 'then', '\n', '1', '\n', 'end' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstIf, {
            cases: [
              {
                condition: astModule.createNode(AstBoolLit, { value: true }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1 })
                  ]
                })
              }
            ]
          })
        ]
      })
    },
    {
      name: 'is parsing if with elseif',
      input: [ 'if', 'true', '\n', '42', '\n', 'else', 'if', 'false', '\n', '1337', '\n', 'end' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstIf, {
            cases: [
              {
                condition: astModule.createNode(AstBoolLit, { value: true }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 42 })
                  ]
                })
              },
              {
                condition: astModule.createNode(AstBoolLit, { value: false }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1337 })
                  ]
                })
              }
            ]
          })
        ]
      })
    },
    {
      name: 'is parsing if with else',
      input: [ 'if', 'true', '\n', '42', '\n', 'else', '\n', '1337', '\n', 'end' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstIf, {
            cases: [
              {
                condition: astModule.createNode(AstBoolLit, { value: true }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 42 })
                  ]
                })
              },
              {
                condition: null,
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1337 })
                  ]
                })
              }
            ]
          })
        ]
      })
    },
    {
      name: 'is parsing if with else if and else',
      input: [ 'if', 'true', '\n', '42', '\n', 'else', 'if', 'false', '\n', '1337', '\n', 'else', '\n', '9001', '\n', 'end' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstIf, {
            cases: [
              {
                condition: astModule.createNode(AstBoolLit, { value: true }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 42 })
                  ]
                })
              },
              {
                condition: astModule.createNode(AstBoolLit, { value: false }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1337 })
                  ]
                })
              },
              {
                condition: null,
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 9001 })
                  ]
                })
              }
            ]
          })
        ]
      })
    },
    {
      name: 'is parsing if - else - else if without newlines',
      input: [ 'if', 'true', '42', 'else', 'if', 'false', '1337', 'else', '9001' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstIf, {
            cases: [
              {
                condition: astModule.createNode(AstBoolLit, { value: true }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 42 })
                  ]
                })
              },
              {
                condition: astModule.createNode(AstBoolLit, { value: false }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1337 })
                  ]
                })
              },
              {
                condition: null,
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.LOCAL,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 9001 })
                  ]
                })
              }
            ]
          })
        ]
      })
    },
    {
      name: 'is parsing invalid if',
      input: ['if', 'true', 'then', 'then'],
      output:  new syntaxErrorModule.SyntaxError(errorMessages.UNEXPECTED_KEYWORD, {
        token: new tokenModule.Token('then', {
          file: null,
          lineText: '',
          line: 0,
          character: 0
        })
      }),
      fails: true
    },
  ];
});