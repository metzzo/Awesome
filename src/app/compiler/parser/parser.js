define([ ], function() {
  var Parser = function(tokens) {
    if (!(tokens instanceof Array)) {
      throw 'Invalid Parameter';
    }
    
    this.tokens = tokens;
  };
  
  return {
    Parser: Parser
  }
});