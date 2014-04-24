define(['underscore.string', 'src/app/compiler/semanter/semanter', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/dataType', 'src/app/compiler/syntaxError', 'src/app/compiler/errorMessages', 'src/app/compiler/lexer/token'], function(_s, semanterModule, astModule, dataTypeModule, syntaxErrorModule, errorMessages, tokenModule) {
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
  
  describe('AstNode If', function() {
    describe('has correct type check for valid boolean', function() {
      // arrange
      var semanter;
      var ast, condition;
      // act
      semanter = new semanterModule.Semanter(ast = astModule.createNode(AstIf, {
          cases: [
            {
              condition: condition = astModule.createNode(AstBoolLit, { value: true }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [ ]
              })
            }
          ]
      }));
      semanter.semant();
      
      // assert
      expect(ast.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.VOID);
      expect(condition.getDataType()).toBe(dataTypeModule.PrimitiveDataTypes.BOOL);
    });
    
    describe('has correct type check for invalid int', function() {
      // arrange
      var semanter;
      var ast, condition;
      // act
      semanter = new semanterModule.Semanter(ast = astModule.createNode(AstIf, {
          cases: [
            {
              condition: condition = astModule.createNode(AstIntLit, { value: 42 }),
              scope: astModule.createNode(AstScope, {
                type: AstScope.types.LOCAL,
                nodes: [ ]
              })
            }
          ]
      }));
      ast.traverse(function(node) {
        node.token = defaultToken;
      });
      
      expect(function() { semanter.semant() }).toThrow(new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.UNEXPECTED_DATATYPE, 'bool', 'int'), { token: defaultToken }));
    });
  });
  
});