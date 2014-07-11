define([ 'src/app/compiler/awesome', 'spec/language/params/awesome/functionParams', 'spec/language/params/awesome/statementParams' ], function(Awesome, functionParams, statementParams) {
  describe('Awesome', function() {
    var params = {
      'Function': functionParams,
      'Statement': statementParams
    };
    
    _.each(params, function(testParams, testName) {
      describe(testName, function() {
        _.each(testParams, function(test) {
          it(test.name, function() {
            // arrange
            var input = test.input instanceof Array ? test.input.join('\n') : test.input;
            var awesome = new Awesome('import compiletest_module \n '+input);
            awesome.addFile('compiletest_module', 'extern \n function compiletest(arg is bool) returns void alias "compiletest.push.bind(compiletest)" \n function compiletest(arg is int) returns void alias "compiletest.push.bind(compiletest)" \n function compiletest(arg is string) returns void alias "compiletest.push.bind(compiletest)" \n function compiletest(arg is float) returns void alias "compiletest.push.bind(compiletest)" \n end');
            var result;
            
            if (test.setup) {
              test.setup(awesome);
            }
            
            // act
            result = awesome.compile();
            
            var compiletest = [ ];
            eval(result);
            
            // assert
            expect(compiletest).toEqual(test.output);
          });
        });
      });
    });
  });
})