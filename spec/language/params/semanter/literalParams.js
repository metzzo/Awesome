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
  
  var defaultToken = new tokenModule.Token('test', {
    file: null,
    lineText: '',
    line: 0,
    character: 0
  });
  
  return [
    {
      name: 'has correct data type for bool',
      input: astModule.createNode(AstBoolLit, { value: true }),
      check: function(ast, semanter) {
        expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.BOOL);
      }
    },
    {
      name: 'has correct data type for int',
      input: astModule.createNode(AstIntLit, { value: 42 }),
      check: function(ast, semanter) {
        expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.INT);
      }
    },
    {
      name: 'has correct data type for string',
      input: astModule.createNode(AstStringLit, { value: 'YOLO' }),
      check: function(ast, semanter) {
        expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.STRING);
      }
    }
  ]
});