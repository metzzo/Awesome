define(['underscore.string', 'src/app/compiler/lexer/token', 'src/app/compiler/ast/ast', 'src/app/compiler/data/operator', 'src/app/compiler/data/syntaxError', 'src/app/compiler/data/errorMessages', 'src/app/compiler/data/dataType'], function(_s, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages, dataTypeModule) {
  var AstOperator   = astModule.AstPrototypes.OPERATOR;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  var AstVarDec     = astModule.AstPrototypes.VARDEC;
  var AstDataType   = astModule.AstPrototypes.DATATYPE;
  
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
      name: 'is parsing simple variable declaration',
      input: ['var','yolo', '=', '1'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo', token: t('yolo') }),
              dataType: null,
              value: astModule.createNode(AstIntLit, { value: 1, token: t('1') }),
              type: AstVarDec.types.VARIABLE
            }
          ],
          token: t('var')
        })
      ]
    }, 
    {
      name: 'is parsing simple variable declaration with datatype declaration',
      input: ['var','yolo', 'is', 'int'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo', token: t('yolo') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: null,
              type: AstVarDec.types.VARIABLE
            }
          ],
          token: t('var')
        })
      ]
    }, 
    {
      name: 'is parsing simple variable declaration with datatype declaration and value',
      input: ['var','yolo', 'is', 'int', '=', '1'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo', token: t('yolo') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: astModule.createNode(AstIntLit, { value: 1, token: t('1') }),
              type: AstVarDec.types.VARIABLE
            }
          ],
          token: t('var')
        })
      ]
    }, 
    {
      name: 'is parsing invalid variable declaration',
      input: ['var','yolo'],
      output: new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.UNEXPECTED_TOKEN, '\n', '='), {
        token: new tokenModule.Token('\n', {
          file: null,
          lineText: '',
          line: 0,
          character: 0
        })
      }),
      fails: true
    },
    {
      name: 'is parsing multiple variable declaration',
      input: ['var','yolo', '=', '1', ',', 'swag', '=', '2'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo', token: t('yolo') }),
              dataType: null,
              value: astModule.createNode(AstIntLit, { value: 1, token: t('1') }),
              type: AstVarDec.types.VARIABLE
            },
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'swag', token: t('swag') }),
              dataType: null,
              value: astModule.createNode(AstIntLit, { value: 2, token: t('2') }),
              type: AstVarDec.types.VARIABLE
            }
          ],
          token: t('var')
        })
      ]
    },
    {
      name: 'is parsing var decl inside an expression',
      input: ['1', '+', 'var', 'i', '=', '1'],
      output: [
        astModule.createNode(AstOperator, {
          leftOperand: astModule.createNode(AstIntLit, { value: 1, token: t('1') }),
          rightOperand: astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'i', token: t('i') }),
                dataType: null,
                value: astModule.createNode(AstIntLit, { value: 1, token: t('1') }),
                type: AstVarDec.types.VARIABLE
              }
            ],
            token: t('var')
          }),
          operator: operatorModule.Operators.PLUS_OPERATOR,
          token: t('+')
        })
      ]
    },
    {
      name: 'is not parsing multiple var decl inside an expression',
      input: ['1', '+', 'var', 'i', '=', '1', ',', 'j', '=', '2'],
      output: new syntaxErrorModule.SyntaxError(errorMessages.TOO_MANY_VARIABLES, {
        token: new tokenModule.Token('\n', {
          file: null,
          lineText: '',
          line: 0,
          character: 0
        })
      }),
      fails: true
    },
    {
      name: 'is parsing multiple variable declaration with default datatype',
      input: ['var', 'is', 'int', 'yolo', ',', 'swag', 'is', 'int'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo', token: t('yolo') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: null,
              type: AstVarDec.types.VARIABLE
            },
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'swag', token: t('swag') }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT, token: t('int') }),
              value: null,
              type: AstVarDec.types.VARIABLE
            }
          ],
          token: t('var')
        })
      ]
    },
    {
      name: 'is parsing simple const declaration',
      input: ['const','yolo', '=', '1'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo', token: t('yolo') }),
              dataType: null,
              value: astModule.createNode(AstIntLit, { value: 1, token: t('1') }),
              type: AstVarDec.types.CONSTANT
            }
          ],
          token: t('const')
        })
      ]
    }
  ];
})