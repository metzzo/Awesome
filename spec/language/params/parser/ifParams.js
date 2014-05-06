define(['underscore.string', 'src/app/compiler/lexer/token', 'src/app/compiler/ast/ast', 'src/app/compiler/data/operator', 'src/app/compiler/data/syntaxError', 'src/app/compiler/data/errorMessages'], function(_s, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages) {
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstIf         = astModule.AstPrototypes.IF;
  var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
  var AstEmpty      = astModule.AstPrototypes.EMPTY;
  
  var t = function(name) {
    return new tokenModule.Token(name, {
      file: null,
      lineText: '',
      line: 0,
      character: 0
    });
  };
  
  return [
    {
      name: 'is parsing if',
      input: [ 'if', 'true', '\n', '1', '\n', 'end' ],
      output: [
        astModule.createNode(AstIf, {
          cases: [
            {
              condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 1, token: t('1') })
                ],
                token: t('\n')
              })
            }
          ],
          token: t('if')
        })
      ]
    },
    {
      name: 'is parsing if with then',
      input: [ 'if', 'true', 'then', '\n', '1', '\n', 'end' ],
      output: [
        astModule.createNode(AstIf, {
          cases: [
            {
              condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 1, token: t('1') })
                ],
                token: t('\n')
              })
            }
          ],
          token: t('if')
        })
      ]
    },
    {
      name: 'is parsing if with elseif',
      input: [ 'if', 'true', '\n', '42', '\n', 'else', 'if', 'false', '\n', '1337', '\n', 'end' ],
      output: [
        astModule.createNode(AstIf, {
          cases: [
            {
              condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 42, token: t('42') })
                ],
                token: t('\n')
              })
            },
            {
              condition: astModule.createNode(AstBoolLit, { value: false, token: t('false') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 1337, token: t('1337') })
                ],
                token: t('\n')
              })
            }
          ],
          token: t('if')
        })
      ]
    },
    {
      name: 'is parsing if with else',
      input: [ 'if', 'true', '\n', '42', '\n', 'else', '\n', '1337', '\n', 'end' ],
      output: [
        astModule.createNode(AstIf, {
          cases: [
            {
              condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 42, token: t('42') })
                ],
                token: t('\n')
              })
            },
            {
              condition: astModule.createNode(AstEmpty, { token: t('1337') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 1337, token: t('1337') })
                ],
                token: t('\n')
              })
            }
          ],
          token: t('if')
        })
      ]
    },
    {
      name: 'is parsing if with else if and else',
      input: [ 'if', 'true', '\n', '42', '\n', 'else', 'if', 'false', '\n', '1337', '\n', 'else', '\n', '9001', '\n', 'end' ],
      output: [
        astModule.createNode(AstIf, {
          cases: [
            {
              condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 42, token: t('42') })
                ],
                token: t('\n')
              })
            },
            {
              condition: astModule.createNode(AstBoolLit, { value: false, token: t('false') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 1337, token: t('1337') })
                ],
                token: t('\n')
              })
            },
            {
              condition: astModule.createNode(AstEmpty, { token: t('9001') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 9001, token: t('9001') })
                ],
                token: t('\n')
              })
            }
          ],
          token: t('if')
        })
      ]
    },
    {
      name: 'is parsing if - else - else if without newlines',
      input: [ 'if', 'true', '42', 'else', 'if', 'false', '1337', 'else', '9001' ],
      output: [
        astModule.createNode(AstIf, {
          cases: [
            {
              condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 42, token: t('42') })
                ],
                token: t('42')
              })
            },
            {
              condition: astModule.createNode(AstBoolLit, { value: false, token: t('false') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 1337, token: t('1337') })
                ],
                token: t('1337')
              })
            },
            {
              condition: astModule.createNode(AstEmpty, { token: t('9001') }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 9001, token: t('9001') })
                ],
                token: t('9001')
              })
            }
          ],
          token: t('if')
        })
      ]
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