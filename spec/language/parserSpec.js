define(['app/compiler/parser/parser', 'app/compiler/lexer/token', 'app/compiler/ast/ast', 'app/compiler/parser/operator'], function(parserModule, tokenModule, astModule, operatorModule) {
  describe('Parser', function() {
    it('is created properly', function() {
      // arrange
      var parser;
      var input = [ ];
      
      var expectedInput = [new tokenModule.Token('\n', {
        lineText: '',
        line: 0,
        character: 0,
        file: null
      })];
      
      // act
      parser = new parserModule.Parser(input);
      
      // assert
      expect(parser).not.toBeNull();
      expect(parser.input).toEqual(expectedInput);
    });
    
    it('is not created properly', function() {
      // arrange
      var parser;
      var input = null;
      
      // act // assert
      expect(function() { parser = new parserModule.Parser(input); }).toThrow('Invalid Parameter');
    });
    
    var AstScope = astModule.AstPrototypes.SCOPE;
    var AstOperator = astModule.AstPrototypes.OPERATOR;
    var AstIntLit = astModule.AstPrototypes.INT_LITERAL;
    
    var params = [
      {
        name: 'is parsing empty input properly',
        input: [ ],
        output: astModule.createNode(AstScope, { type: AstScope.types.MAIN, nodes: [ ] })
      },
      {
        name: 'is parsing literal input properly',
        input: [ '42' ],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN, 
          nodes: [
            astModule.createNode(AstIntLit, { value: 42 })
          ]
        })
      },
      {
        name: 'is parsing simple term properly',
        input: [ '1', '+', '2'],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN,
          nodes: [
            astModule.createNode(AstOperator, {
              leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
              rightOperand: astModule.createNode(AstIntLit, { value: 2 }),
              operator: operatorModule.Operators.PLUS_OPERATOR
            })
          ]
        })
      }
    ];
    
    for (var testCase = 0; testCase < params.length; testCase++) {
      var test = params[testCase];
      (function(test) {
        it(test.name, function() {
          // arrange
          var parser;
          var input = [ ];
          var output;
          var expectedOutput = test.output;
          
          for (var inputToken = 0; inputToken < test.input.length; inputToken++) {
            var token = test.input[inputToken];
            input.push(new tokenModule.Token(token, {
              file: null,
              lineText: '',
              line: 0,
              character: 0
            }));
          }
          
          // act
          parser = new parserModule.Parser(input);
          output = parser.parse(input);
          
          // assert
          expect(parser).not.toBeNull();
          expect(parser.input).toBe(input);
          expect(output).not.toBeNull();
          expect(output).toEqual(expectedOutput);
        });
      })(test);
    };
  });
  
  /*it('', function() {
    // arrange
    
    // act
    
    // assert
    
  });*/
  
});