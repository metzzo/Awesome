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
    if (this.params.conversions.length == 0) {
      if (left.matches(right)) {
        // strict type check!
      }
    } else {
      for (var i = 0; i < this.params.conversions.length; i++) {
        var conversion = this.params.conversions[i];
        if ((left.matches(conversion.from[0]) && right.matches(conversion.from[1]))) {
          return conversion.to;
        }
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
      from: [dataTypeModule.PrimitiveDataTypes.BOOL, dataTypeModule.PrimitiveDataTypes.BOOL],
      to: dataTypeModule.PrimitiveDataTypes.BOOL
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT],
      to: dataTypeModule.PrimitiveDataTypes.FLOAT
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.FLOAT, dataTypeModule.PrimitiveDataTypes.INT],
      to: dataTypeModule.PrimitiveDataTypes.FLOAT
    }
  ];
  
  var assignOperatorConversions = [
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
      from: [dataTypeModule.PrimitiveDataTypes.BOOL, dataTypeModule.PrimitiveDataTypes.BOOL],
      to: dataTypeModule.PrimitiveDataTypes.BOOL
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT],
      to: dataTypeModule.PrimitiveDataTypes.INT
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.FLOAT, dataTypeModule.PrimitiveDataTypes.INT],
      to: dataTypeModule.PrimitiveDataTypes.FLOAT
    }
  ];
  
  var comparisonOperatorConversions = [
    {
      from: [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.INT],
      to: dataTypeModule.PrimitiveDataTypes.BOOL
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.FLOAT, dataTypeModule.PrimitiveDataTypes.FLOAT],
      to: dataTypeModule.PrimitiveDataTypes.BOOL
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT],
      to: dataTypeModule.PrimitiveDataTypes.BOOL
    },
    {
      from: [dataTypeModule.PrimitiveDataTypes.FLOAT, dataTypeModule.PrimitiveDataTypes.INT],
      to: dataTypeModule.PrimitiveDataTypes.BOOL
    }
  ];
  
  var equalOperatorConversions = comparisonOperatorConversions.slice(0);
  equalOperatorConversions.push(
    {
      from: [dataTypeModule.PrimitiveDataTypes.STRING, dataTypeModule.PrimitiveDataTypes.STRING],
      to: dataTypeModule.PrimitiveDataTypes.BOOL
    }
  );
  
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
        conversions: assignOperatorConversions
      }),
      GREATER_THAN_OPERATOR: new Operator('>', {
        priority: 8,
        conversions: comparisonOperatorConversions
      }),
      LESS_THAN_OPERATOR: new Operator('<', {
        priority: 8,
        conversions: comparisonOperatorConversions
      }),
      GREATER_THAN_OR_EQUAL_OPERATOR: new Operator('>=', {
        priority: 8,
        conversions: comparisonOperatorConversions
      }),
      LESS_THAN_OR_EQUAL_OPERATOR: new Operator('<=', {
        priority: 8,
        conversions: comparisonOperatorConversions
      }),
      EQUAL_OPERATOR: new Operator('==', {
        priority: 6,
        conversions: equalOperatorConversions
      }),
      NOT_EQUAL_OPERATOR: new Operator('!=', {
        priority: 6,
        conversions: equalOperatorConversions
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