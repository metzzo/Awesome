define(['underscore.string', 'src/lib/js/jsel', 'src/app/compiler/ast/ast', 'src/app/compiler/data/dataType', 'src/app/compiler/data/syntaxError', 'src/app/compiler/data/errorMessages', 'src/app/compiler/lexer/token', 'src/app/compiler/data/operator', 'src/app/compiler/data/identifier'], function(_s, jsel, astModule, dataTypeModule, syntaxErrorModule, errorMessages, tokenModule, operatorModule, identifierModule) {
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstOperator   = astModule.AstPrototypes.OPERATOR;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstIf         = astModule.AstPrototypes.IF;
  var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
  var AstCall       = astModule.AstPrototypes.CALL;
  var AstStringLit  = astModule.AstPrototypes.STRING_LITERAL;
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  var AstWhile      = astModule.AstPrototypes.WHILE;
  var AstFor        = astModule.AstPrototypes.FOR;
  var AstRepeat     = astModule.AstPrototypes.REPEAT;
  var AstVarDec     = astModule.AstPrototypes.VARDEC;
  var AstDataType   = astModule.AstPrototypes.DATATYPE;
  var AstFunction   = astModule.AstPrototypes.FUNCTION;
  var AstEmpty      = astModule.AstPrototypes.EMPTY;
  
  var defaultToken = new tokenModule.Token('test', {
    file: null,
    lineText: '',
    line: 0,
    character: 0
  });
  
  return [
    {
      name: 'simple type check in operator',
      input: astModule.createNode(AstOperator, {
        leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
        rightOperand: astModule.createNode(AstIntLit, { value: 2 }),
        operator: operatorModule.Operators.PLUS_OPERATOR
      }),
      check: function(ast, semanter) {
        expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.INT);
      }
    },
    {
      name: 'simple type check in operator fails',
      input: astModule.createNode(AstOperator, {
        leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
        rightOperand: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.VOID }),
        operator: operatorModule.Operators.PLUS_OPERATOR
      }),
      check: function(expect) {
        expect.toThrow(new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.AMBIGUOUS_DATATYPE, 'int', 'void'), { token: defaultToken }));
      },
      fails: true
    },
    {
      name: 'assign operator works',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          }),
          astModule.createNode(AstOperator, {
            leftOperand: astModule.createNode(AstIdentifier, { name: 'yolo' }),
            rightOperand: astModule.createNode(AstIntLit, { value: 42 }),
            operator: operatorModule.Operators.ASSIGN_OPERATOR
          })
        ]
      }),
      check: function(ast, semanter) {
        expect(jsel(ast).select('//params/nodes/*[2]').getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.INT);
      }
    },
    {
      name: 'assign operator does not work',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          }),
          astModule.createNode(AstOperator, {
            leftOperand: astModule.createNode(AstIdentifier, { name: 'yolo' }),
            rightOperand: astModule.createNode(AstStringLit, { value: 'swag' }),
            operator: operatorModule.Operators.ASSIGN_OPERATOR
          })
        ]
      }),
      check: function(expect) {
        expect.toThrow(new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.AMBIGUOUS_DATATYPE, 'int', 'string'), { token: defaultToken }));
      },
      fails: true
    },
    {
      name: 'assign operator sets data type properly',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN } ),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          }),
          astModule.createNode(AstOperator, {
            leftOperand: astModule.createNode(AstIdentifier, { name: 'yolo' }),
            rightOperand: astModule.createNode(AstStringLit, { value: 'swag' }),
            operator: operatorModule.Operators.ASSIGN_OPERATOR
          }),
          astModule.createNode(AstEmpty, {
            check: function(ast) {
              expect(ast.getScope().getVariables()).toEqual([
                new identifierModule.Identifier('yolo', {
                  dataType: dataTypeModule.PrimitiveDataTypes.STRING,
                  type: AstVarDec.types.VARIABLE 
                })
              ]);
            }
          })
        ]
      }),
      check: function(ast, semanter) {
        expect(jsel(ast).select('//params/nodes/*[2]').getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.STRING);
      }
    },
    {
      name: 'plus operator sets data type properly from complex term',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN}),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              },
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'swag' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN}),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          }),
          astModule.createNode(AstOperator, {
            leftOperand: astModule.createNode(AstOperator, {
              leftOperand: astModule.createNode(AstIdentifier, { name: 'yolo' }),
              rightOperand: astModule.createNode(AstIdentifier, { name: 'swag' }),
              operator: operatorModule.Operators.PLUS_OPERATOR
            }),
            rightOperand: astModule.createNode(AstIntLit, { value: 42 }),
            operator: operatorModule.Operators.PLUS_OPERATOR
          }),
          astModule.createNode(AstEmpty, {
            check: function(ast) {
              expect(ast.getScope().getVariables()).toEqual([
                new identifierModule.Identifier('yolo', {
                  dataType: dataTypeModule.PrimitiveDataTypes.INT,
                  type: AstVarDec.types.VARIABLE 
                }),
                new identifierModule.Identifier('swag', {
                  dataType: dataTypeModule.PrimitiveDataTypes.INT,
                  type: AstVarDec.types.VARIABLE 
                })
              ]);
            }
          })
        ]
      }),
      check: function(ast, semanter) { }
    },
    {
      name: 'data types are not the same var a is int = "hello"',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.STRING}),
                value: astModule.createNode(AstIntLit, { value: 42 }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          })
        ]
      }),
      check: function(expect) {
        expect.toThrow(new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.AMBIGUOUS_DATATYPE, 'string', 'int'), { token: defaultToken }));
      },
      fails: true
    },
    {
      name: 'void is invalid',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.VOID}),
                value: astModule.createNode(AstIntLit, { value: 42 }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          })
        ]
      }),
      check: function(ast, semanter) { },
      fails: true
    }
  ]
});