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
        rightOperand: astModule.createNode(AstStringLit, { value: 'YOLO' }),
        operator: operatorModule.Operators.PLUS_OPERATOR
      }),
      check: function(expect) {
        expect.toThrow(new syntaxErrorModule.SyntaxError(errorMessages.AMBIGUOUS_DATATYPE, { token: defaultToken }));
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
        expect.toThrow(new syntaxErrorModule.SyntaxError(errorMessages.AMBIGUOUS_DATATYPE, { token: defaultToken }));
      },
      fails: true
    }
  ]
});