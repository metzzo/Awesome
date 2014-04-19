define([ 'app/compiler/parser/tokenIterator' ], function(tokenIteratorSpec) {
  var Parser = function(input) {
    if (!(input instanceof Array)) {
      throw 'Invalid Parameter';
    }
    
    this.input = input;
    this.result = null;
  };
  
  Parser.prototype.parse = function() {
    this.result = [ ];
    return this.result;
  };
  
  return {
    Parser: Parser
  }
});