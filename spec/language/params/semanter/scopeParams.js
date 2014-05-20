define(['underscore.string', 'src/lib/js/jsel', 'src/app/compiler/ast/ast', 'src/app/compiler/data/dataType', 'src/app/compiler/data/syntaxError', 'src/app/compiler/data/errorMessages', 'src/app/compiler/lexer/token', 'src/app/compiler/data/identifier'], function(_s, jsel, astModule, dataTypeModule, syntaxErrorModule, errorMessages, tokenModule, identifierModule) {
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
      name: 'simple scope returns correct variables',
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
              },
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'swag' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          }),
          astModule.createNode(AstEmpty, {
            check: function(ast) {
               expect(ast.getScope().getVariables()).toEqual([
                new identifierModule.Identifier('yolo', {
                  dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: defaultToken }),
                  type: AstVarDec.types.VARIABLE
                }),
                new identifierModule.Identifier('swag', {
                  dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: defaultToken }),
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
      name: 'nested scopes have correct variable lists',
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
              },
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'swag' }),
                dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
                value: astModule.createNode(AstEmpty, { }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          }),
          astModule.createNode(AstScope, {
            type: AstScope.types.LOCAL,
            nodes: [
              astModule.createNode(AstVarDec, {
                variables: [
                  {
                    identifier: astModule.createNode(AstIdentifier, { name: 'yolo2' }),
                    dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
                    value: astModule.createNode(AstEmpty, { }),
                    type: AstVarDec.types.VARIABLE
                  },
                  {
                    identifier: astModule.createNode(AstIdentifier, { name: 'swag2' }),
                    dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
                    value: astModule.createNode(AstEmpty, { }),
                    type: AstVarDec.types.VARIABLE
                  }
                ]
              }),
              astModule.createNode(AstEmpty, {
                check: function(ast) {
                   expect(ast.getScope().getVariables()).toEqual([
                    new identifierModule.Identifier('yolo', {
                      dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: defaultToken }),
                      type: AstVarDec.types.VARIABLE
                    }),
                    new identifierModule.Identifier('swag', {
                      dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: defaultToken }),
                      type: AstVarDec.types.VARIABLE
                    }),
                    new identifierModule.Identifier('yolo2', {
                      dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: defaultToken }),
                      type: AstVarDec.types.VARIABLE
                    }),
                    new identifierModule.Identifier('swag2', {
                      dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: defaultToken }),
                      type: AstVarDec.types.VARIABLE
                    })
                  ]);
                }
              })
              
            ]
          }),
          astModule.createNode(AstEmpty, {
            check: function(ast) {
               expect(ast.getScope().getVariables()).toEqual([
                new identifierModule.Identifier('yolo', {
                  dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: defaultToken }),
                  type: AstVarDec.types.VARIABLE
                }),
                new identifierModule.Identifier('swag', {
                  dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: defaultToken }),
                  type: AstVarDec.types.VARIABLE
                })
              ]);
            }
          })
        ]
      }),
      check: function(ast, semanter) { }
    }
  ]
});