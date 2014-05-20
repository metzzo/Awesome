define([ 'src/app/compiler/awesome' ], function(awesomeModule) {
  describe('Awesome', function() {
    it('is created properly', function() {
      // arrange
      var awesome;
      
      // act
      awesome = new awesomeModule.Awesome('print 42');
      
      // assert
      expect(awesome).not.toBeNull();
      expect(awesome.input).toBe('print 42');
    });
    
    it('compiles simple if', function() {
      // arrange
      var awesome = new awesomeModule.Awesome('if true \n 42 \n end');
      var result;
      
      // act
      result = awesome.compile();
      
      // assert
      expect(result).toBe('swag');
    });
  });
})