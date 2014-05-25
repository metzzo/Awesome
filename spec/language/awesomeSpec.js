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
      eval(result);
      
      // assert
      /*expect(result).toBe('{\n\
  if (true) {\n\
    42;\n\
  };\n\
}');*/
    });
    
    it('compiles cyclic imports', function() {
      // arrange
      var awesome = new Awesome('import a \n import b \n func_a \n func_b');
      awesome.addFile('a', 'import b ; func_b \n function func_a() \n end');
      awesome.addFile('b', 'import a ; func_a \n function func_b() \n end');
      var result;
      
      // act
      result = awesome.compile();
      eval(result);
      
      // assert
      /*expect(result).toBe('var func_b = function () { };\n\
var func_a = function () { };\n\
{\n\
  /* Import: a ;\n\
  /* Import: b ;\n\
  func_a();\n\
  func_b();\n\
}');*/
    });
  });
})