define(['app/compiler/parser/parser'], function(parserModule) {
  describe('Parser', function() {
    it('is created properly', function() {
      // arrange
      var parser;
      var tokens = [ ];
      
      // act
      parser = new parserModule.Parser(tokens);
      
      // assert
      expect(parser).not.toBeNull();
      expect(parser.tokens).toEqual(tokens);
    });
    
    it('is not created properly', function() {
      // arrange
      var parser;
      var tokens = null;
      
      // act // assert
      expect(function() { parser = new parserModule.Parser(tokens); }).toThrow('Invalid Parameter');
    });
  });
  
  /*it('', function() {
    // arrange
    
    // act
    
    // assert
    
  });*/
  
});