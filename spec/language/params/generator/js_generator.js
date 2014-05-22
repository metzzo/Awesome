define(['src/app/compiler/ast/ast', 'src/app/compiler/data/dataType', 'src/app/compiler/data/syntaxError', 'src/app/compiler/data/errorMessages', 'src/app/compiler/lexer/token', 'src/app/compiler/data/identifier', 'src/app/compiler/data/operator'], function(astModule, dataTypeModule, syntaxErrorModule, errorMessages, tokenModule, identifierModule, operatorModule) {
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
  
  return [
    {
      name: 'generates empty scope properly',
      input: astModule.createNode(AstScope, {
        type: AstScope.types.LOCAL,
        nodes: [ ]
      }),
      output: '{ }\n'
    },
    {
      name: 'generates simple if properly',
      input: astModule.createNode(AstIf, {
        cases: [
          {
            condition: astModule.createNode(AstBoolLit, { value: true }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.LOCAL,
              nodes: [ ]
            })
          }
        ]
      }),
      output: 'if (true) { }\n'
    },
    {
      name: 'generates complex if properly',
      input: astModule.createNode(AstIf, {
        cases: [
          {
            condition: astModule.createNode(AstBoolLit, { value: true }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.LOCAL,
              nodes: [ ]
            })
          },
          {
            condition: astModule.createNode(AstBoolLit, { value: false }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.LOCAL,
              nodes: [ ]
            })
          },
          {
            condition: astModule.createNode(AstEmpty),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.LOCAL,
              nodes: [ ]
            })
          },
        ]
      }),
      output: 'if (true) { }\n else if (false) { }\n else { }\n'
    },
    {
      name: 'generates simple operator',
      input: astModule.createNode(AstOperator, {
        leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
        rightOperand: astModule.createNode(AstIntLit, { value: 2 }),
        operator: operatorModule.Operators.PLUS_OPERATOR
      }),
      output: '(1 + 2)'
    },
    {
      name: 'generates variable declaration',
      input: astModule.createNode(AstVarDec, {
        variables: [
          {
            identifier: astModule.createNode(AstIdentifier, { name: 'yolo' }),
            dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT}),
            value: astModule.createNode(AstIntLit, { value: 42 }),
            type: AstVarDec.types.VARIABLE
          },
          {
            identifier: astModule.createNode(AstIdentifier, { name: 'swag' }),
            dataType: astModule.createNode(AstDataType, { dataType: dataTypeModule.PrimitiveDataTypes.INT}),
            value: astModule.createNode(AstEmpty, { }),
            type: AstVarDec.types.VARIABLE
          }
        ]
      }),
      output: 'var yolo = 42, swag = 0'
    },
    {
      name: 'generates identifier',
      input: astModule.createNode(AstIdentifier, { name: 'swag' }),
      output: 'swag'
    },
    {
      name: 'generates Empty',
      input: astModule.createNode(AstEmpty, { }),
      output: ''
    },
    {
      name: 'generates int',
      input: astModule.createNode(AstIntLit, { value: 42 }),
      output: '42'
    },
    {
      name: 'generates float',
      input: astModule.createNode(AstIntLit, { value: 42.42 }),
      output: '42.42'
    },
    {
      name: 'generates string',
      input: astModule.createNode(AstIntLit, { value: '"42"' }),
      output: '"42"'
    },
    {
      name: 'generates bool',
      input: astModule.createNode(AstIntLit, { value: true }),
      output: 'true'
    }
  ]
});