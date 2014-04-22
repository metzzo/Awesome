define(['src/app/compiler/semanter/semanter', 'src/app/compiler/ast/ast'], function(semanterModule, astModule) {
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
  
  describe('"if" has correct type check for integer', function() {
    // arrange
    var semanter;
    
    // act
    
    
    // assert
    
  });
});