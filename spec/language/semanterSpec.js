define([ 'underscore', 'src/app/compiler/semanter/semanter', 'src/app/compiler/lexer/token', 'spec/language/params/semanter/ifParams'], function(_, semanterModule, tokenModule, ifParams) {
  var defaultToken = new tokenModule.Token('then', {
    file: null,
    lineText: '',
    line: 0,
    character: 0
  });
  
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
  
  var params = {
    'If': ifParams
  };
  
  _.each(params, function(testParams, testName) {
    describe(testName, function() {
      _.each(testParams, function(test) {
        it(test.name, function() {
          // arrange
          var semanter = new semanterModule.Semanter(test.input);
          
          test.input.traverse(function(node) {
            node.token = defaultToken;
          });
          // act
          var func = function() {
            semanter.semant();
          };
          
          if (!test.fails) {
            func();
            test.check(test.input, semanter);
          } else {
            test.check(expect(func), test.input, semanter);
          }
        });
      });
    });
  })
});