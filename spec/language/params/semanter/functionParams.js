define(['underscore.string', 'src/lib/js/jsel', 'src/app/compiler/ast/ast', 'src/app/compiler/data/dataType', 'src/app/compiler/data/syntaxError', 'src/app/compiler/data/errorMessages', 'src/app/compiler/lexer/token', 'src/app/compiler/data/operator'], function(_s, jsel, astModule, dataTypeModule, syntaxErrorModule, errorMessages, tokenModule, operatorModule) {
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
  var AstReturn     = astModule.AstPrototypes.RETURN;
  
  var defaultToken = new tokenModule.Token('test', {
    file: null,
    lineText: '',
    line: 0,
    character: 0
  });
  
  return [
    {
      name: 'simple function call is semanted correctly',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstFunction, {
            params: [ ],
            name: astModule.createNode(AstIdentifier, { name: 'hello' }),
            returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.FUNCTION,
              nodes: [
                astModule.createNode(AstIntLit, { value: 1})
              ]
            })
          }),
          astModule.createNode(AstCall, {
            func: astModule.createNode(AstIdentifier, { name: 'hello' }),
            params: [ ]
          })
        ]
      }),
      check: function(ast, semanter) {
        
      }
    },
    {
      name: 'outer type inference works for parameter',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstFunction, {
            params: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'foo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ],
            name: astModule.createNode(AstIdentifier, { name: 'hello' }),
            returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.FUNCTION,
              nodes: [
                astModule.createNode(AstIntLit, { value: 1 })
              ]
            })
          }),
          astModule.createNode(AstCall, {
            func: astModule.createNode(AstIdentifier, { name: 'hello' }),
            params: [ astModule.createNode(AstIntLit, { value: 42 }) ]
          })
        ]
      }),
      check: function(ast, semanter) {
        
      }
    },
    {
      name: 'inner type inference works for parameter',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstFunction, {
            params: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'foo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ],
            name: astModule.createNode(AstIdentifier, { name: 'hello' }),
            returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.FUNCTION,
              nodes: [
                astModule.createNode(AstOperator, {
                  leftOperand: astModule.createNode(AstIdentifier, { name: 'foo' }),
                  rightOperand: astModule.createNode(AstIntLit, { value: 2 }),
                  operator: operatorModule.Operators.ASSIGN_OPERATOR
                })
              ]
            })
          })
        ]
      }),
      check: function(ast, semanter) {
        
      }
    },
    {
      name: 'inner type inference works for parameter and is not overwritten by outer type inference',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstFunction, {
            params: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'foo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ],
            name: astModule.createNode(AstIdentifier, { name: 'hello' }),
            returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.FUNCTION,
              nodes: [
                astModule.createNode(AstOperator, {
                  leftOperand: astModule.createNode(AstIdentifier, { name: 'foo' }),
                  rightOperand: astModule.createNode(AstIntLit, { value: 2 }),
                  operator: operatorModule.Operators.ASSIGN_OPERATOR
                })
              ]
            })
          }),
          astModule.createNode(AstCall, {
            func: astModule.createNode(AstIdentifier, { name: 'hello' }),
            params: [ astModule.createNode(AstBoolLit, { value: true }) ]
          })
        ]
      }),
      check: function(expect) {
        
      },
      fails: true
    },
    {
      name: 'anonymous function and calling it works',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'foo' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
                value: astModule.createNode(AstFunction, {
                  params: [ ],
                  name: astModule.createNode(AstEmpty, { }),
                  returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
                  scope: astModule.createNode(AstScope, {
                    type: AstScope.types.FUNCTION,
                    nodes: [ ]
                  })
                }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          }),
          astModule.createNode(AstCall, {
            func: astModule.createNode(AstIdentifier, { name: 'foo' }),
            params: [ ]
          })
        ]
      }),
      check: function(ast, semanter) {
        
      }
    },
    {
      name: 'is semanting invalid extern function',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstFunction, {
            params: [ ],
            name: astModule.createNode(AstIdentifier, { name: 'swag' }),
            returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
            aliasName: 'yolo',
            scope: astModule.createNode(AstEmpty, { }),
          })
        ]
      }),
      check: function(expect) { },
      fails: true
    },
    {
      name: 'is semanting return datatype correctly',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [
          astModule.createNode(AstFunction, {
            params: [ ],
            name: astModule.createNode(AstIdentifier, { name: 'hello' }),
            returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.FUNCTION,
              nodes: [
                astModule.createNode(AstReturn, { ret: astModule.createNode(AstIntLit, {value: 1}) })
              ]
            })
          }),
          astModule.createNode(AstCall, {
            func: astModule.createNode(AstIdentifier, { name: 'hello' }),
            params: [ ]
          })
        ]
      }),
      check: function(ast, semanter) {
        expect(ast.params.nodes[0].params.returnDataType.getDataType()).toEqual(dataTypeModule.PrimitiveDataTypes.INT);
      }
    }
  ]
});