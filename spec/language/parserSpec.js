define(['src/app/compiler/parser/parser', 'src/app/compiler/lexer/token', 'spec/language/params/parser/expressionParams', 'spec/language/params/parser/ifParams', 'spec/language/params/parser/loopParams'], function(parserModule, tokenModule, expressionParams, ifParams, loopParams) {
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
    
    var params = [ ];
    params = params.concat(expressionParams);
    params = params.concat(ifParams);
    params = params.concat(loopParams);
    
    for (var testCase = 0; testCase < params.length; testCase++) {
      var test = params[testCase];
      (function(test) {
        it(test.name, function() {
          // arrange
          var parser;
          var input = [ ];
          var output;
          var expectedOutput = test.output;
          var fails = test.fails;
          
          for (var inputToken = 0; inputToken < test.input.length; inputToken++) {
            var token = test.input[inputToken];
            input.push(new tokenModule.Token(token, {
              file: null,
              lineText: '',
              line: 0,
              character: 0
            }));
          }
          
          var func = function() {
            // act
            parser = new parserModule.Parser(input);
            output = parser.parse(input);
            
          };
          if (fails) {
            expect(func).toThrow(expectedOutput);
            
            expect(parser).not.toBeNull();
            expect(parser.input).toBe(input);
            expect(parser.output).toBeNull();
          } else {
            func();
            
            // assert
            expect(parser).not.toBeNull();
            expect(parser.input).toBe(input);
            expect(output).not.toBeNull();
            expect(output).toEqual(expectedOutput);
          }
        });
      })(test);
    };
  });
});