define(['underscore.string', 'src/lib/js/jsel', 'src/app/compiler/ast/ast', 'src/app/compiler/data/dataType', 'src/app/compiler/data/syntaxError', 'src/app/compiler/data/errorMessages', 'src/app/compiler/lexer/token'], function(_s, jsel, astModule, dataTypeModule, syntaxErrorModule, errorMessages, tokenModule) {
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
      name: 'while has correct type check for valid boolean',
      input: astModule.createNode(AstWhile, {
        condition: astModule.createNode(AstBoolLit, { value: true }),
        scope: astModule.createNode(AstScope, {
          type: AstScope.types.LOCAL,
          nodes: [ ]
        })
      }),
      check: function(ast, semanter) {
        expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.VOID);
        expect(jsel(ast).select('//params/condition').getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.BOOL);
      }
    },
    {
      name: 'while has correct type check for invalid int',
      input: astModule.createNode(AstWhile, {
        condition: astModule.createNode(AstIntLit, { value: 42 }),
        scope: astModule.createNode(AstScope, {
          type: AstScope.types.LOCAL,
          nodes: [ ]
        })
      }),
      check: function(expect) {
        expect.toThrow(new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.UNEXPECTED_DATATYPE, 'bool', 'int'), { token: defaultToken }));
      },
      fails: true
    },
    {
      name: 'while sets implicit data types properly',
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
              }
            ]
          }),
          astModule.createNode(AstWhile, {
              condition: astModule.createNode(AstIdentifier, { name: 'yolo' }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [ ]
              })
          })
        ]
      }),
      check: function(ast, semanter) { }
    },
    {
      name: 'repeat has correct type check for valid boolean',
      input: astModule.createNode(AstRepeat, {
        condition: astModule.createNode(AstBoolLit, { value: true }),
        scope: astModule.createNode(AstScope, {
          type: AstScope.types.LOCAL,
          nodes: [ ]
        })
      }),
      check: function(ast, semanter) {
        expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.VOID);
        expect(jsel(ast).select('//params/condition').getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.BOOL);
      }
    },
    {
      name: 'repeat has correct type check for invalid int',
      input: astModule.createNode(AstRepeat, {
        condition: astModule.createNode(AstIntLit, { value: 42 }),
        scope: astModule.createNode(AstScope, {
          type: AstScope.types.LOCAL,
          nodes: [ ]
        })
      }),
      check: function(expect) {
        expect.toThrow(new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.UNEXPECTED_DATATYPE, 'bool', 'int'), { token: defaultToken }));
      },
      fails: true
    },
    {
      name: 'repeat sets implicit data types properly',
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
              }
            ]
          }),
          astModule.createNode(AstRepeat, {
              condition: astModule.createNode(AstIdentifier, { name: 'yolo' }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [ ]
              })
          })
        ]
      }),
      check: function(ast, semanter) { }
    }
  ]
});