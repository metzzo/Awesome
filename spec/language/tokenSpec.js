define(['app/compiler/lexer/token'], function(tokenModule) {
  describe('Token', function() {
    it('is created properly', function() {
      // arrange
      var token;
      var tokenText = 'token';
      var tokenParams = {
        file: null,
        lineText: tokenText,
        line: 0,
        character: 0
      };
      
      // act
      token = new tokenModule.Token(tokenText, tokenParams);
      
      // assert
      expect(token).not.toBeNull();
      expect(token.text).toBe(tokenText);
      expect(token.params).toEqual(tokenParams);
    });
    
    it('is not creating invalid token properly', function() {
      // arrange
      var token;
      var tokenText = '';
      var tokenParams = {
        file: null,
        lineText: tokenText,
        line: 0,
        character: 0
      };
      
      // act / assert
      expect(function() { new tokenModule.Token(tokenText, tokenParams); }).toThrow("Invalid Parameter");
    });
    
    it('is created properly and returns correct toString', function() {
      // arrange
      var token;
      var tokenText = 'token';
      var tokenParams = {
        file: null,
        lineText: tokenText,
        line: 0,
        character: 0
      };
      
      // act
      token = new tokenModule.Token(tokenText, tokenParams);
      
      // assert
      expect(token).not.toBeNull();
      expect(token.text).toBe(tokenText);
      expect(token.params).toEqual(tokenParams);
      expect(token.toString()).toBe(tokenText+' (file: ' + tokenParams.file + ' in line '+tokenParams.line + ' at character ' + tokenParams.character + ')');
    });
  });
});
