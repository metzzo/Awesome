define(['underscore', 'src/app/compiler/data/dataType'], function(_, dataTypeModule) {
  var Operator = function(name, params) {
    if (!name || name.length == 0 || !params || typeof params.priority === 'undefined') {
      throw 'Invalid Parameter';
    }
    
    this.name = name;
    this.params = {
      priority: params.priority,
      conversions: params.conversions
    };
  };
  
  Operator.prototype.balance = function(left, right) {
    for (var i = 0; i < this.params.conversions.length; i++) {
      var conversion = this.params.conversions[i];
      if ((left.matches(conversion.from[0]) && right.matches(conversion.from[1])) || (left.matches(conversion.from[1]) && right.matches(conversion.from[0]))) {
        return conversion.to;
      }
    }
    return dataTypeModule.MetaDataTypes.AMBIGUOUS;
  };
  
  var defaultOperatorConversions = [
    {
      from: [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.INT],
      to: dataTypeModule.PrimitiveDataTypes.INT
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.FLOAT, dataTypeModule.PrimitiveDataTypes.FLOAT],
      to: dataTypeModule.PrimitiveDataTypes.FLOAT
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.STRING, dataTypeModule.PrimitiveDataTypes.STRING],
      to: dataTypeModule.PrimitiveDataTypes.STRING
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT],
      to: dataTypeModule.PrimitiveDataTypes.FLOAT
    }
  ];
  
  var maxPriority;
  var operators;
  return {
    Operator: Operator,
    Operators: operators = {
      PLUS_OPERATOR: new Operator('+', {
        priority: 10,
        conversions: defaultOperatorConversions
      }),
      MINUS_OPERATOR: new Operator('-', {
        priority: 10,
        conversions: defaultOperatorConversions
      }),
      MUL_OPERATOR: new Operator('*', {
        priority: 20,
        conversions: defaultOperatorConversions
      }),
      DIV_OPERATOR: new Operator('/', {
        priority: 20,
        conversions: defaultOperatorConversions
      }),
      ASSIGN_OPERATOR: new Operator('=', {
        priority: 2,
        conversions: [ ]
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
    },
    findMaxPriority: function() {
      if (_.isUndefined(maxPriority)) {
        maxPriority = 0;
        _.each(operators, function(value) {
          if (value.params.priority > maxPriority) {
            maxPriority = value.params.priority;
          }
        });
      }
      return maxPriority;
    },
    findOperatorByText: function(operator) {
      var result;
      _.each(operators, function(value) {
        if (value.name === operator) {
          result = value;
        }
      });
      return result;
    }
  };
});