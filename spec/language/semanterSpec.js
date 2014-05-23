define([ 'underscore', 'src/app/compiler/semanter/semanter', 'src/app/compiler/lexer/token', 'spec/language/params/semanter/ifParams', 'spec/language/params/semanter/literalParams', 'spec/language/params/semanter/scopeParams', 'spec/language/params/semanter/expressionParams', 'spec/language/params/semanter/loopParams', 'spec/language/params/semanter/functionParams'], function(_, semanterModule, tokenModule, ifParams, literalParams, scopeParams, expressionParams, loopParams, functionParams) {
  var defaultToken = new tokenModule.Token('test', {
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
    
    var params = {
      'If': ifParams,
      'Loop': loopParams,
      'Literal': literalParams,
      'Scope': scopeParams,
      'Function': functionParams,
      'Expression': expressionParams
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
              
              // check nodes
              test.input.traverse(function(ast) {
                if (ast.params.check) {
                  ast.params.check(ast);
                }
              });
            } else {
              test.check(expect(func), test.input, semanter);
            }
          });
        });
      });
    })
  });
});