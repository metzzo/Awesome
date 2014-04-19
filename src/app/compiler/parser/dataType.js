define([ ], function() {
  var DataType = function(name, params) {
    if (!name || name.length == 0 || !params) {
      throw 'Invalid Parameter';
    }
    this.name = name;
    this.params = { };
  };
  
  return {
    DataType: DataType,
    PrimitiveDataTypes: {
      INT: new DataType('int', { }),
      FLOAT: new DataType('float', { }),
      STRING: new DataType('string', { }),
      OBJECT: new DataType('object', { }),
      FUNCTION: new DataType('function', { }),
      BOOL: new DataType('bool', { })
    }
  };
});