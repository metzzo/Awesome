define([ 'src/app/compiler/generator/generator', 'src/app/compiler/lexer/token', 'spec/language/params/generator/js_generator' ], function(generatorModule, tokenModule, jsGeneratorModule) {
  var defaultToken = new tokenModule.Token('test', {
    file: null,
    lineText: '',
    line: 0,
    character: 0
  });
  
  describe('Generator', function() {
    it('emits properly', function() {
      // arrange
      var generator = new generatorModule.Generator({ });
      var expectedResult = '{\n  SWAG\n  \n}';
      var result;
      
      // act
      generator.emit('{');
      generator.indent();
      generator.emitLine('SWAG');
      generator.emitLine();
      generator.outdent();
      generator.emitLine('}')
      
      result = generator.getCode();
      
      // assert
      expect(result).toBe(expectedResult);
    });
    
    var params = {
      'JS Generator': jsGeneratorModule
    };
    _.each(params, function(testParams, testName) {
      describe(testName, function() {
        _.each(testParams, function(test) {
          it(test.name, function() {
            // arrange
            var generator = new generatorModule.Generator(test.input);
            var result;
            
            test.input.traverse(function(node) {
              node.token = defaultToken;
            });
            
            // act
            result = generator.generate();
            
            // assert
            expect(result).toEqual(test.output);
          });
        });
      });
    });
  });
});