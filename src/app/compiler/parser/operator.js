define([ ], function() {
  var Operator = function(name, params) {
    if (!name || name.length == 0 || !params || typeof params.priority === 'undefined') {
      throw 'Invalid Parameter';
    }
    
    this.name = name;
    this.params = {
      priority: params.priority
    };
  };
  
  return {
    Operator: Operator,
    Operators: {
      PLUS_OPERATOR: new Operator('+', {
        priority: 10
      }),
      MINUS_OPERATOR: new Operator('-', {
        priority: 10
      })
    }
  };
});