define(['underscore'], function(_) {
  var DataType = function(name, params) {
    if (!name || name.length == 0 || !params) {
      throw 'Invalid Parameter';
    }
    this.name = name;
    this.params = { };
  };
  
  DataType.prototype.matches = function(dt) {
    return this.name === dt.name;
  };
  
  DataType.prototype.toString = function() {
    return this.name
  };
  
  DataType.prototype.balance = function(other) {
    if (this.matches(other)) {
      return this;
    } else {
      // TODO: add maybe some conversions?
      return metaTypes.AMBIGUOUS
    }
  };
  DataType.prototype.isKnown = function() {
    return !(this.matches(metaTypes.UNKNOWN) || this.matches(metaTypes.AMBIGUOUS))
  };
  
  var dataTypes, metaTypes;
  return {
    DataType: DataType,
    PrimitiveDataTypes: dataTypes = {
      INT: new DataType('int', { }),
      FLOAT: new DataType('float', { }),
      STRING: new DataType('string', { }),
      OBJECT: new DataType('object', { }),
      FUNCTION: new DataType('function', { }),
      BOOL: new DataType('bool', { }),
      VOID: new DataType('void', { }),
    },
    MetaDataTypes: metaTypes = {
      UNKNOWN: new DataType('unknown', { }), // this is the data type of ast nodes that are not known yet, but may be known in future
      AMBIGUOUS: new DataType('ambiguous', { }) // this is the data type of ast nodes where the data type cannot be traced definitely
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