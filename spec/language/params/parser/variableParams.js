define(['underscore.string', 'src/app/compiler/lexer/token', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/operator', 'src/app/compiler/syntaxError', 'src/app/compiler/errorMessages', 'src/app/compiler/parser/dataType'], function(_s, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages, dataTypeModule) {
  var AstOperator   = astModule.AstPrototypes.OPERATOR;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
  var AstCall       = astModule.AstPrototypes.CALL;
  var AstStringLit  = astModule.AstPrototypes.STRING_LITERAL;
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  var AstVarDec     = astModule.AstPrototypes.VARDEC;
  var AstDataType   = astModule.AstPrototypes.DATATYPE;
  
  return [
    {
      name: 'is parsing simple variable declaration',
      input: ['var','yolo', '=', '1'],
      output: [
        astModule.createNode(AstVarDec, {
          variables: [
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
              dataType: null,
              value: astModule.createNode(AstIntLit, { value: 1 }),
              type: AstVarDec.types.VARIABLE
            }
          ]
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
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
              value: null,
              type: AstVarDec.types.VARIABLE
            }
          ]
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
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
              dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT }),
              value: astModule.createNode(AstIntLit, { value: 1 }),
              type: AstVarDec.types.VARIABLE
            }
          ]
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
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
              dataType: null,
              value: astModule.createNode(AstIntLit, { value: 1 }),
              type: AstVarDec.types.VARIABLE
            },
            {
              identifier: astModule.createNode(AstIdentifier, { name: 'swag' }),
              dataType: null,
              value: astModule.createNode(AstIntLit, { value: 2 }),
              type: AstVarDec.types.VARIABLE
            }
          ]
          
        })
      ]
    },
    {
      name: 'is parsing var decl inside an expression',
      input: ['1', '+', 'var', 'i', '=', '1'],
      output: [
        astModule.createNode(AstOperator, {
          leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
          rightOperand: astModule.createNode(AstVarDec, {
            variables: [
              {
                identifier: astModule.createNode(AstIdentifier, { name: 'i' }),
                dataType: null,
                value: astModule.createNode(AstIntLit, { value: 1 }),
                type: AstVarDec.types.VARIABLE
              }
            ]
          }),
          operator: operatorModule.Operators.PLUS_OPERATOR
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
          ]
          
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
              identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
              dataType: null,
              value: astModule.createNode(AstIntLit, { value: 1 }),
              type: AstVarDec.types.CONSTANT
            }
          ]
        })
      ]
    }
  ];
})