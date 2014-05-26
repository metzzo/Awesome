define(['underscore'], function(_) {
  var DataTypeTypes = {
    PRIMITIVE: 'primitive',
    META: 'meta',
    FUNCTION: 'function'
  };
  
  var DataType = function(name, params) {
    if (!name || name.length == 0 || !params) {
      throw 'Invalid Parameter';
    }
    this.name = name;
    this.params = params;
  };
  
  DataType.prototype.matches = function(dt) {
    if (dt.params.type === this.params.type) {
      switch (this.params.type) {
        case DataTypeTypes.PRIMITIVE:
        case DataTypeTypes.META:
          return this.name === dt.name;
        case DataTypeTypes.FUNCTION:
          if (this.params.returnType.matches(dt.params.returnType)) { // check if return type match
            // check if parameter match
            if (this.params.paramTypes.length === dt.params.paramTypes.length) {
              for (var i = 0; i < this.params.paramTypes.length; i++) {
                var t1 = this.params.paramTypes[i];
                var t2 = dt.params.paramTypes[i];
                if (!t1.matches(t2)) {
                  return false;
                }
              }
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        default:
          throw 'Unknown DataType type';
      }
    } else {
      return false;
    }
  };
  
  DataType.prototype.toString = function() {
    switch (this.params.type) {
      case DataTypeTypes.PRIMITIVE:
      case DataTypeTypes.META:
        return this.name;
      case DataTypeTypes.FUNCTION:
        var ret = ''
        for (var i = 0; i < this.params.paramTypes.length; i++) {
          if (i !== 0) {
            ret += ', ';
          }
          ret += this.params.paramTypes[i].toString();
        }
        
        return this.name + '(' + ret + ') returns ' + this.params.returnType.toString();
      default:
        throw 'Unknown DataType type';
    }
  };
  
  DataType.prototype.decorateName = function() {
    switch (this.params.type) {
      case DataTypeTypes.PRIMITIVE:
      case DataTypeTypes.META:
        return '_'+this.name;
      case DataTypeTypes.FUNCTION:
        var ret = ''
        for (var i = 0; i < this.params.paramTypes.length; i++) {
          if (i !== 0) {
            ret += '_';
          }
          ret += this.params.paramTypes[i].toString();
        }
        
        return '_func_' + ret + '_ret_' + this.params.returnType.toString();
      default:
        throw 'Unknown DataType type';
    }
  };
  
  /**
   * Returns the common type of this and other
   */
  DataType.prototype.balance = function(other) {
    if (this.matches(other)) {
      return this;
    } else {
      // TODO: add maybe some conversions?
      return metaTypes.AMBIGUOUS
    }
  };
  
  /**
   * Is this dataType a known dataType?
   */
  DataType.prototype.isKnown = function() {
    switch (this.params.type) {
      case DataTypeTypes.PRIMITIVE:
      case DataTypeTypes.META:
        return !(this.matches(metaTypes.UNKNOWN) || this.matches(metaTypes.AMBIGUOUS))
      case DataTypeTypes.FUNCTION:
        var isUnknown = false;
        for (var i = 0; i < this.params.paramTypes.length; i++) {
          if (!this.params.paramTypes[i].isKnown()) {
            isUnknown = true;
            break;
          }
        }
        return this.params.returnType.isKnown() && !isUnknown;
      default:
        throw 'Unknown DataType type';
    }
  };
  
  var dataTypes, metaTypes;
  return {
    PrimitiveDataTypes: dataTypes = {
      INT: new DataType('int', { type: DataTypeTypes.PRIMITIVE }),
      FLOAT: new DataType('float', { type: DataTypeTypes.PRIMITIVE }),
      STRING: new DataType('string', { type: DataTypeTypes.PRIMITIVE }),
      BOOL: new DataType('bool', { type: DataTypeTypes.PRIMITIVE }),
      VOID: new DataType('void', { type: DataTypeTypes.PRIMITIVE }),
    },
    MetaDataTypes: metaTypes = {
      UNKNOWN: new DataType('unknown', { type: DataTypeTypes.META }), // this is the data type of ast nodes that are not known yet, but may be known in future
      AMBIGUOUS: new DataType('ambiguous', { type: DataTypeTypes.META }) // this is the data type of ast nodes where the data type cannot be traced definitely
    },
    findPrimitiveDataTypeByName: function(name) {
      var result = null;
      _.each(dataTypes, function(value) {
        if (value.name === name) {
          result = value;
        }
      });
      return result;
    },
    createFunctionDataType: function(returnType, paramTypes) {
      if (!returnType || !paramTypes) {
        throw 'Invalid Parameter';
      }
      var dataType = new DataType('function', {
        type: DataTypeTypes.FUNCTION,
        returnType: returnType,
        paramTypes: paramTypes
      })
      return dataType;
    }
  };
});