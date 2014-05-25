define([ 'src/app/compiler/awesome' ], function(Awesome) {
  describe('Awesome', function() {
    it('is created properly', function() {
      // arrange
      var awesome;
      
      // act
      awesome = new Awesome('print 42');
      
      // assert
      expect(awesome).not.toBeNull();
    });
    
    it('compiles simple if', function() {
      // arrange
      var awesome = new Awesome('if true \n 42 \n end');
      var result;
      
      // act
      result = awesome.compile();
      
      // assert
      expect(result).toBe('{\n\
  if (true) {\n\
    42;\n\
  };\n\
}');
    });
  });
})