define(['underscore'], function(_) {
  var DataType = function(name, params) {
    if (!name || name.length == 0 || !params) {
      throw 'Invalid Parameter';
    }
    this.name = name;
    this.params = { };
  };
  
  var dataTypes;
  return {
    DataType: DataType,
    PrimitiveDataTypes: dataTypes = {
      INT: new DataType('int', { }),
      FLOAT: new DataType('float', { }),
      STRING: new DataType('string', { }),
      OBJECT: new DataType('object', { }),
      FUNCTION: new DataType('function', { }),
      BOOL: new DataType('bool', { })
    },
    findPrimitiveDataTypeByName: function(name) {
      var result = null;
      _.each(dataTypes, function(value) {
        if (value.name === name) {
          result = value;
        }
      });
      return result;
    }
  };
});