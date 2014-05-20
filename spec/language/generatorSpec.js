define([ 'src/app/compiler/generator/generator' ], function(generatorModule) {
  describe('Generator', function() {
    it('is created properly', function() {
      // arrange
      var generator;
      
      // act
      generator = new generatorModule.Generator({ })
      
      // assert
      expect(generator).not.toBeNull();
      expect(generator.mainNode).toEqual({ });
    })
  });
});