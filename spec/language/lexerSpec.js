define(['src/app/compiler/lexer/lexer', 'src/app/compiler/lexer/token', 'spec/language/params/lexer/lexerParams'], function(lexerModule, tokenModule, params) {
  describe('Lexer', function() {
    it('is taking parameter properly', function() {
      // arrange
      var lexer;
      var input = 'input code yolo';
      
      // act
      lexer = new lexerModule.Lexer(input);
      
      // assert
      expect(lexer).not.toBeNull();
      expect(lexer.input).toBe(input);
    });
    
    for (var testCase = 0; testCase < params.length; testCase++) {
      var test = params[testCase];
      (function(test) {
        it(test.name, function() {
          // arrange
          var lexer;
          var input = test.input;
          if (test.input instanceof Array) {
            input = test.input.join('\n');
          }
          
          var output;
          var expectedOutput = [ ];
          for (var outputToken = 0; outputToken < test.output.length; outputToken++) {
            var token = test.output[outputToken];
            if (typeof token.params.lineText == 'undefined') {
              if (outputToken == 0) {
                token.params.lineText = input; // use the input as line
              } else {
                token.params.lineText = test.output[outputToken - 1].params.lineText; // use the line of the token before
              }
            }
            if (typeof token.params.file == 'undefined') {
              token.params.file = null;
            }
            expectedOutput.push(new tokenModule.Token(token.text, token.params));
          }
          
          // act
          lexer = new lexerModule.Lexer(input);
          output = lexer.tokenize();
          
          // assert
          expect(lexer).not.toBeNull();
          expect(lexer.input).toBe(input);
          expect(output).not.toBeNull();
          expect(output).toEqual(expectedOutput);
        });
      })(test);
    };
  });
});
