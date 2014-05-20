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
  });
})