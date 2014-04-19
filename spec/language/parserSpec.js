define(['app/compiler/parser/parser', 'app/compiler/lexer/token'], function(parserModule, tokenModule) {
  describe('Parser', function() {
    it('is created properly', function() {
      // arrange
      var parser;
      var input = [ ];
      
      // act
      parser = new parserModule.Parser(input);
      
      // assert
      expect(parser).not.toBeNull();
      expect(parser.input).toEqual(input);
    });
    
    it('is not created properly', function() {
      // arrange
      var parser;
      var input = null;
      
      // act // assert
      expect(function() { parser = new parserModule.Parser(input); }).toThrow('Invalid Parameter');
    });
    
    var params = [
      {
        name: 'is parsing empty input properly',
        input: [ ],
        output: [ ]
      },
      {
        name: 'is parsing simple term properly',
        input: [ '1', '+', '1'],
        output: [ ]
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