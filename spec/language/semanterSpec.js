define(['src/app/compiler/semanter/semanter', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/dataType'], function(semanterModule, astModule, dataTypeModule) {
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
  
  describe('Semanter', function() {
    it('is created properly', function() {
      // arrange
      var semanter;
      
      // act
      semanter = new semanterModule.Semanter({ });
      
      // assert
      expect(semanter).not.toBeNull();
    });
  });
  
  describe('"if" has correct type check for valid boolean', function() {
    // arrange
    var semanter;
    var ast;
    // act
    semanter = new semanterModule.Semanter(ast = astModule.createNode(AstIf, {
        cases: [
          {
            condition: astModule.createNode(AstBoolLit, { value: true }),
            scope: astModule.createNode(AstScope, {
              type: AstScope.types.LOCAL,
              nodes: [
                astModule.createNode(AstIntLit, { value: 1 })
              ]
            })
          }
        ]
    }));
    semanter.semant();
    
    // assert
    expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.VOID);
  });
});