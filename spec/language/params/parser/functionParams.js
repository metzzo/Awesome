define(['underscore.string', 'src/app/compiler/lexer/token', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/operator', 'src/app/compiler/syntaxError', 'src/app/compiler/errorMessages', 'src/app/compiler/parser/dataType'], function(_s, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages, dataTypeModule) {
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstDataType   = astModule.AstPrototypes.DATATYPE;
  var AstFunction   = astModule.AstPrototypes.FUNCTION;
  var AstVarDec     = astModule.AstPrototypes.VARDEC;
  
  return [
    {
      name: 'is parsing simple function',
      input: ['function', 'hello', '\n', '1', '\n', 'end'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'hello' }),
              dataType: null,
              value: astModule.createNode(AstFunction, {
                params: [ ],
                returnDataType: null,
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.FUNCTION,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1 })
                  ]
                })
              }),
              type: AstVarDec.types.CONSTANT
            }
          ]
        })
      ]
    },
    {
      name: 'is parsing function with parameters',
      input: ['function', 'hello', '(', 'yolo', 'is', 'int', ',', 'swag', 'is', 'int', ')', '\n', '1', '\n', 'end'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'hello' }),
              dataType: null,
              value: astModule.createNode(AstFunction, {
                params: [
                  {
                    identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
                    dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
                    value: null,
                    type: AstVarDec.types.VARIABLE
                  },
                  {
                    identifier: astModule.createNode(AstIdentifier, { name: 'swag' }),
                    dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
                    value: null,
                    type: AstVarDec.types.VARIABLE
                  }
                ],
                returnDataType: null,
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.FUNCTION,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1 })
                  ]
                })
              }),
              type: AstVarDec.types.CONSTANT
            }
          ]
        })
      ]
    },
    {
      name: 'is parsing anonymous function',
      input: ['var', 'i', '=', 'function', '\n', '1', '\n', 'end'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'i' }),
              dataType: null,
              value: astModule.createNode(AstFunction, {
                params: [ ],
                returnDataType: null,
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.FUNCTION,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1 })
                  ]
                })
              }),
              type: AstVarDec.types.VARIABLE
            }
          ]
        })
      ]
    }
  ];
});