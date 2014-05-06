define([ ], function() {
  var Identifier = function(name, params) {
    this.name   = name;
    this.params = params;
  };
  
  return {
    Identifier: Identifier,
    Types: {
      LOCAL: 'local'
    }
  };
});