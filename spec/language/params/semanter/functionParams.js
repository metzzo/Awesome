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
            returnDataType: astModule.createNode(AstEmpty, { }),
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
            returnDataType: astModule.createNode(AstEmpty, { }),
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
            returnDataType: astModule.createNode(AstEmpty, { }),
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
    }
  ]
});