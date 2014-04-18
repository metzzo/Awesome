define(['app/compiler/lexer/lexer'], function(lexerModule) {
  describe('Lexer', function() {
    it('is created properly', function() {
      // arrange
      var lexer;
      
      // act
      lexer = new lexerModule.Lexer();
      
      
      // assert
      expect(lexer).not.toBeNull();
    });
    
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
    
    it('is tokenizing simple text properly', function() {
      // arrange
      var lexer;
      var input = 'input';
      
      var result;
      var expectedResult = [
        new lexerModule.Token(input, {
          line: 0,
          character: 0,
          file: null,
          lineText: input
        })
      ];
      
      // act
      lexer = new lexerModule.Lexer(input);
      result = lexer.tokenize();
      
      // assert
      expect(lexer).not.toBeNull();
      expect(lexer.input).toBe(input);
      expect(result).not.toBeNull();
      expect(result).toEqual(expectedResult);
    });
    
    it('is tokenizing simple more complex text properly', function() {
      // arrange
      var lexer;
      var input = 'input output';
      
      var result;
      var expectedResult = [
        new lexerModule.Token('input', {
          line: 0,
          character: 0,
          file: null,
          lineText: input
        }),
        new lexerModule.Token('output', {
          line: 0,
          character: 6,
          file: null,
          lineText: input
        })
      ];
      // act
      lexer = new lexerModule.Lexer(input);
      result = lexer.tokenize();
      
      // assert
      expect(lexer).not.toBeNull();
      expect(lexer.input).toBe(input);
      expect(result).not.toBeNull();
      expect(result).toEqual(expectedResult);
    });
    
    /*it('', function() {
      // arrange
      
      // act
      
      // assert
      
    });*/
  });
});
