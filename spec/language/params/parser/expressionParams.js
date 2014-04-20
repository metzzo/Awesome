define(['underscore.string', 'src/app/compiler/lexer/token', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/operator', 'src/app/compiler/syntaxError', 'src/app/compiler/errorMessages'], function(_s, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages) {
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstOperator   = astModule.AstPrototypes.OPERATOR;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstIf         = astModule.AstPrototypes.IF;
  var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
  var AstCall       = astModule.AstPrototypes.CALL;
  var AstStringLit  = astModule.AstPrototypes.STRING_LITERAL;
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  
  return [
    {
      name: 'is parsing empty input properly',
      input: [ ],
      output: astModule.createNode(AstScope, { type: AstScope.types.MAIN, nodes: [ ] })
    },
    {
      name: 'is parsing literal input properly',
      input: [ '42' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN, 
        nodes: [
          astModule.createNode(AstIntLit, { value: 42 })
        ]
      })
    },
    {
      name: 'is parsing simple term properly',
      input: [ '1', '+', '2'],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstOperator, {
            leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
            rightOperand: astModule.createNode(AstIntLit, { value: 2 }),
            operator: operatorModule.Operators.PLUS_OPERATOR
          })
        ]
      })
    },
    {
      name: 'is parsing complex term properly',
      input: [ '1', '+', '2', '*', '3'],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstOperator, {
            leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
            rightOperand: astModule.createNode(AstOperator, {
              leftOperand: astModule.createNode(AstIntLit, { value: 2 }),
              rightOperand: astModule.createNode(AstIntLit, { value: 3 }),
              operator: operatorModule.Operators.MUL_OPERATOR
            }),
            operator: operatorModule.Operators.PLUS_OPERATOR
          })
        ]
      })
    },
    {
      name: 'is not parsing simple term "1++1"',
      input: [ '1', '+', '+', '2' ],
      output: new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.EXPECTING_FACTOR, '+'), {
        token: new tokenModule.Token('+', {
          file: null,
          lineText: '',
          line: 0,
          character: 0
        })
      }),
      fails: true
    },
    {
      name: 'is parsing simple function call',
      input: [ 'print', '"Hello World"' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstCall, {
            func: astModule.createNode(AstIdentifier, { name: 'print' }),
            params: [
              astModule.createNode(AstStringLit, { value: 'Hello World' })
            ]
          })
        ]
      })
    },
    {
      name: 'is parsing complex term with functions and variables',
      input: [ '1', '+', 'swag', '*', 'hallo', '(', 'true', ',', 'false', ')' ],
      output: astModule.createNode(AstScope, {
        type: AstScope.types.MAIN,
        nodes: [
          astModule.createNode(AstOperator, {
            leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
            rightOperand: astModule.createNode(AstOperator, {
              leftOperand: astModule.createNode(AstIdentifier, { name: 'swag' }),
              rightOperand: astModule.createNode(AstCall, {
                func: astModule.createNode(AstIdentifier, { name: 'hallo' }),
                params: [
                  astModule.createNode(AstBoolLit, { value: true }),
                  astModule.createNode(AstBoolLit, { value: false }),
                ]
              }),
              operator: operatorModule.Operators.MUL_OPERATOR
            }),
            operator: operatorModule.Operators.PLUS_OPERATOR
          })
        ]
      })
    },
    {
      name: 'is parsing invalid variable addition',
      input: [ 'yolo', '+', 'swag' ],
      output: new syntaxErrorModule.SyntaxError(errorMessages.EXPECTING_FUNCTIONCALL, {
        token: new tokenModule.Token('+', {
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