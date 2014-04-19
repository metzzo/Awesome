define(['underscore'], function(_) {
  var Operator = function(name, params) {
    if (!name || name.length == 0 || !params || typeof params.priority === 'undefined') {
      throw 'Invalid Parameter';
    }
    
    this.name = name;
    this.params = {
      priority: params.priority
    };
  };
  
  var operators;
  return {
    Operator: Operator,
    Operators: operators = {
      PLUS_OPERATOR: new Operator('+', {
        priority: 10
      }),
      MINUS_OPERATOR: new Operator('-', {
        priority: 10
      })
    },
    findOperatorsByPriority: function(priority) {
      var result = [ ];
      _.each(operators, function(value) {
        if (value.params.priority === priority) {
          result.push(value);
        }
      });
      return result;
    }
  };
});