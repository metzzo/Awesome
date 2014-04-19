define([ 'app/compiler/syntaxError', 'app/compiler/lexer/token' ], function(syntaxErrorModule, tokenModule) {
  describe('SyntaxError', function() {
    it('is created properly', function() {
      // arrange
      var syntaxError;
      var token = new tokenModule.Token('invalid', {
        line: 42,
        character: 1337,
        lineText: 'invalid',
        file: null
      });
      var msg = 'You have too less swag, please get some more - YOLO';
      
      // act
      syntaxError = new syntaxErrorModule.SyntaxError(msg, {
        token: token
      });
      
      // assert
      expect(syntaxError).not.toBeNull();
      expect(syntaxError.params.token).not.toBeNull();
      expect(syntaxError.params.token).toEqual(token);
      expect(syntaxError.msg).toBe(msg);
    });
    
    it('returns correct toString', function() {
      // arrange
      var syntaxError;
      var token = new tokenModule.Token('invalid', {
        line: 42,
        character: 1337,
        lineText: 'invalid',
        file: null
      });
      var msg = 'You have too less swag, please get some more - YOLO';
      var expectedStr = 'Syntax Error: ' + msg + ' at ' + token.text + ' in line ' + token.params.line + ' at character ' + token.params.character + ' in file ' + token.params.file;
      var str;
      
      // act
      syntaxError = new syntaxErrorModule.SyntaxError(msg, {
        token: token
      });
      str = syntaxError.toString();
      
      // assert
      expect(syntaxError).not.toBeNull();
      expect(syntaxError.params.token).not.toBeNull();
      expect(syntaxError.params.token).toEqual(token);
      expect(syntaxError.msg).toBe(msg);
      expect(str).toBe(expectedStr);
    });
  });
});