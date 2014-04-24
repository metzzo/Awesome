define(['underscore.string', 'src/lib/js/jsel', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/dataType', 'src/app/compiler/syntaxError', 'src/app/compiler/errorMessages', 'src/app/compiler/lexer/token'], function(_s, jsel, astModule, dataTypeModule, syntaxErrorModule, errorMessages, tokenModule) {
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
  
  var defaultToken = new tokenModule.Token('then', {
    file: null,
    lineText: '',
    line: 0,
    character: 0
  });
  
  return [
    {
      name: 'has correct type check for valid boolean',
      input: astModule.createNode(AstIf, {
        cases: [
          {
            condition: condition = astModule.createNode(AstBoolLit, { value: true }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.LOCAL,
              nodes: [ ]
            })
          }
        ]
      }),
      check: function(ast, semanter) {
        expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.VOID);
        expect(jsel(ast).select('//params/cases/*[1]/condition').getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.BOOL);
      }
    },
    {
      name: 'has correct type check for invalid int',
      input: astModule.createNode(AstIf, {
        cases: [
          {
            condition: condition = astModule.createNode(AstIntLit, { value: 42 }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.LOCAL,
              nodes: [ ]
            })
          }
        ]
      }),
      check: function(expect) {
        expect.toThrow(new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.UNEXPECTED_DATATYPE, 'bool', 'int'), { token: defaultToken }));
      },
      fails: true
    }
  ]
});