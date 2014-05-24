define(['underscore.string', 'src/app/compiler/lexer/token', 'src/app/compiler/ast/ast', 'src/app/compiler/data/operator', 'src/app/compiler/data/syntaxError', 'src/app/compiler/data/errorMessages', 'src/app/compiler/data/dataType'], function(_s, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages, dataTypeModule) {
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstDataType   = astModule.AstPrototypes.DATATYPE;
  var AstFunction   = astModule.AstPrototypes.FUNCTION;
  var AstVarDec     = astModule.AstPrototypes.VARDEC;
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
      name: 'is parsing simple function',
      input: ['function', 'hello', '\n', '1', '\n', 'end'],
      output: [
        astModule.createNode(AstFunction, {
          params: [ ],
          name: astModule.createNode(AstIdentifier, { name: 'hello', token: t('hello') }),
          returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('\n') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.FUNCTION,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('\n')
          }),
          token: t('function')
        })
      ]
    },
    {
      name: 'is parsing function with parameters',
      input: ['function', 'hello', '(', 'yolo', 'is', 'int', ',', 'swag', 'is', 'int', ')', '\n', '1', '\n', 'end'],
      output: [
        astModule.createNode(AstFunction, {
          params: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo', token: t('yolo') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: astModule.createNode(AstEmpty, { token: t('yolo') }),
              type: AstVarDec.types.VARIABLE
            },
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'swag', token: t('swag') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: astModule.createNode(AstEmpty, { token: t('swag') }),
              type: AstVarDec.types.VARIABLE
            }
          ],
          name: astModule.createNode(AstIdentifier, { name: 'hello', token: t('hello') }),
          returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('\n') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.FUNCTION,
            nodes: [
              astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('\n')
          }),
          token: t('function')
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
              identifier: astModule.createNode(AstIdentifier, { name: 'i', token: t('i') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('var') }),
              value: astModule.createNode(AstFunction, {
                params: [ ],
                name: astModule.createNode(AstEmpty, { token: t('function') }),
                returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('\n') }),
                scope: astModule.createNode(AstScope, {
                  type: AstScope.types.FUNCTION,
                  nodes: [
                    astModule.createNode(AstIntLit, { value: 1, token: t('1') })
                  ],
                  token: t('\n')
                }),
                token: t('function')
              }),
              type: AstVarDec.types.VARIABLE
            }
          ],
          token: t('var')
        })
      ]
    },
    {
      name: 'is parsing lambda function',
      input: ['(', 'x' ,'is', 'int', ')', '->', '1'],
      output: [
        astModule.createNode(AstFunction, {
          params: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'x', token: t('x') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: astModule.createNode(AstEmpty, { token: t('x') }),
              type: AstVarDec.types.VARIABLE
            }
          ],
          name: astModule.createNode(AstEmpty, { token: t('1') }),
          returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('1') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.FUNCTION,
            nodes: [
             astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('1')
          }),
          token: t('(')
        })
      ]
    },
    {
      name: 'is parsing lambda function without parameter',
      input: ['(', ')', '->', '1'],
      output: [
        astModule.createNode(AstFunction, {
          params: [ ],
          name: astModule.createNode(AstEmpty, { token: t('1') }),
          returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('1') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.FUNCTION,
            nodes: [
             astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('1')
          }),
          token: t('(')
        })
      ]
    },
    {
      name: 'is parsing lambda function with 2 parameter',
      input: ['(', 'x' ,'is', 'int', ',', 'y', '=', '0', ')', '->', '1'],
      output: [
        astModule.createNode(AstFunction, {
          params: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'x', token: t('x') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: astModule.createNode(AstEmpty, { token: t('x') }),
              type: AstVarDec.types.VARIABLE
            },
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'y', token: t('y') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('y') }),
              value: astModule.createNode(AstIntLit, { value: 0, token: t('0') }),
              type: AstVarDec.types.VARIABLE
            }
          ],
          name: astModule.createNode(AstEmpty, { token: t('1') }),
          returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('1') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.FUNCTION,
            nodes: [
             astModule.createNode(AstIntLit, { value: 1, token: t('1') })
            ],
            token: t('1')
          }),
          token: t('(')
        })
      ]
    },
    {
      name: 'is parsing lambda function with begin end scope',
      input: ['(', 'x' ,'is', 'int', ',', 'y', '=', '0', ')', '->', 'begin',';', '1', ';', 'end'],
      output: [
        astModule.createNode(AstFunction, {
          params: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'x', token: t('x') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: astModule.createNode(AstEmpty, { token: t('x') }),
              type: AstVarDec.types.VARIABLE
            },
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'y', token: t('y') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('y') }),
              value: astModule.createNode(AstIntLit, { value: 0, token: t('0') }),
              type: AstVarDec.types.VARIABLE
            }
          ],
          name: astModule.createNode(AstEmpty, { token: t('1') }),
          returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.MetaDataTypes.UNKNOWN, token: t('1') }),
          scope: astModule.createNode(AstScope, {
            type: AstScope.types.FUNCTION,
            nodes: [
              astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [
                  astModule.createNode(AstIntLit, { value: 1, token: t('1') })
                ],
                token: t(';')
              })
            ],
            token: t('begin')
          }),
          token: t('(')
        })
      ]
    },
    {
      name: 'is parsing extern function',
      input: ['extern', '\n', 'function', 'swag', '(', ')', 'returns', 'void', 'alias', 'yolo', '\n', 'end'],
      output: [
        astModule.createNode(AstScope, {
          type: AstScope.types.LOCAL,
          nodes: [
            astModule.createNode(AstFunction, {
              params: [ ],
              name: astModule.createNode(AstIdentifier, { name: 'swag', token: t('swag') }),
              returnDataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.VOID, token: t('void') }),
              aliasName: 'yolo',
              scope: astModule.createNode(AstEmpty, { token: t('returns') }),
              token: t('function')
            })
          ],
          token: t('extern')
        })
      ]
    }
  ];
});