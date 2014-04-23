define(['underscore.string', 'src/app/compiler/lexer/token', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/operator', 'src/app/compiler/syntaxError', 'src/app/compiler/errorMessages'], function(_s, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages) {
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
  var AstWhile      = astModule.AstPrototypes.WHILE;
  var AstFor        = astModule.AstPrototypes.FOR;
  var AstRepeat     = astModule.AstPrototypes.REPEAT;
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  
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
      name: 'is parsing while',
      input: [ 'while', 'true', '\n', '1', '\n', 'end' ],
      output: [
        astModule.createNode(AstWhile, {
          condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('\n')
          }),
          token: t('while')
        })
      ]
    },
    {
      name: 'is parsing while with do',
      input: [ 'while', 'true', 'do', '\n', '1', '\n', 'end' ],
      output: [
        astModule.createNode(AstWhile, {
          condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('\n')
          }),
          token: t('while')
        })
      ]
    },
    {
      name: 'is parsing while with no newline',
      input: [ 'while', 'true', '1', '\n' ],
      output: [
        astModule.createNode(AstWhile, {
          condition: astModule.createNode(AstBoolLit, { value: true, token: t('true') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('1')
          }),
          token: t('while')
        })
      ]
    },
    {
      name: 'is not parsing invalid while',
      input: [ 'while', 'true', 'do', 'do', '\n', '1', '\n', 'end' ],
      output: new syntaxErrorModule.SyntaxError(errorMessages.UNEXPECTED_KEYWORD, {
        token: new tokenModule.Token('do', {
          file: null,
          lineText: '',
          line: 0,
          character: 0
        })
      }),
      fails: true
    },
    {
      name: 'is parsing for',
      input: [ 'for', 'i', 'in', 'swag', '\n', '1', '\n', 'end' ],
      output: [
        astModule.createNode(AstFor, {
          variable: astModule.createNode(AstIdentifier, { name: 'i', token: t('i')}),
          collection: astModule.createNode(AstIdentifier, { name: 'swag', token: t('swag')}),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('\n')
          }),
          token: t('for')
        })
      ]
    },
    {
      name: 'is parsing for with do',
      input: [ 'for', 'i', 'in', 'swag', 'do', '\n', '1', '\n', 'end' ],
      output: [
        astModule.createNode(AstFor, {
          variable: astModule.createNode(AstIdentifier, { name: 'i', token: t('i')}),
          collection: astModule.createNode(AstIdentifier, { name: 'swag', token: t('swag')}),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('\n')
          }),
          token: t('for')
        })
      ]
    },
    {
      name: 'is parsing for with no newline',
      input: [ 'for', 'i', 'in', 'swag', '1', '\n' ],
      output: [
        astModule.createNode(AstFor, {
          variable: astModule.createNode(AstIdentifier, { name: 'i', token: t('i')}),
          collection: astModule.createNode(AstIdentifier, { name: 'swag', token: t('swag')}),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('1')
          }),
          token: t('for')
        })
      ]
    },
    {
      name: 'is not parsing invalid for',
      input: [ 'for', 'i', 'in', 'in', 'swag', 'do', '\n', '1', '\n', 'end' ],
      output: new syntaxErrorModule.SyntaxError(errorMessages.UNEXPECTED_KEYWORD, {
        token: new tokenModule.Token('in', {
          file: null,
          lineText: '',
          line: 0,
          character: 0
        })
      }),
      fails: true
    },
    {
      name: 'is parsing repeat',
      input: [ 'repeat', '\n', '1', '\n', 'until', 'false' ],
      output: [
        astModule.createNode(AstRepeat, {
          condition: astModule.createNode(AstBoolLit, { value: false, token: t('false') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('\n')
          }),
          token: t('repeat')
        })
      ]
    },
    {
      name: 'is parsing repeat with no newline',
      input: [ 'repeat', '1', 'until', 'false', '\n' ],
      output: [
        astModule.createNode(AstRepeat, {
          condition: astModule.createNode(AstBoolLit, { value: false, token: t('false') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('1')
          }),
          token: t('repeat')
        })
      ]
    },
    {
      name: 'is not parsing invalid repeat',
      input: [ 'repeat', '1', 'end', 'false', '\n' ],
      output: new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.UNEXPECTED_TOKEN, 'end', 'until'), {
        token: new tokenModule.Token('end', {
          file: null,
          lineText: '',
          line: 0,
          character: 0
        })
      }),
      fails: true
    }
  ];
});