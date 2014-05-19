define([ 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages' ], function(dataTypeModule, errorMessages) {
  var MAX_TYPE_ERASURE_STEPS = 10; // try to resolve types up to 10 times.
  
  var Semanter = function(mainNode) {
    this.mainNode = mainNode
  };
  
  Semanter.prototype.semant = function() {
    // type erasure
    var anyUnknown, steps = 0;
    do {
      anyUnknown = false;
      this.mainNode.traverse(function(obj) {
        obj.processDataTypes();
        
        var dataType = obj.getDataType();
        if (dataType.matches(dataTypeModule.MetaDataTypes.UNKNOWN)) {
          anyUnknown = true;
        }
      });
      steps ++;
    } while(anyUnknown && steps < MAX_TYPE_ERASURE_STEPS);
    
    if (steps >= MAX_TYPE_ERASURE_STEPS) {
      this.mainNode.traverse(function(obj) {
        var dataType = obj.getDataType();
        if (dataType.matches(dataTypeModule.MetaDataTypes.UNKNOWN)) {
          obj.riseSyntaxError(errorMessages.CANNOT_RESOLVE_DATATYPE);
        }
      });
    }
    
    // check data Types
    this.mainNode.traverse(function(obj) {
      obj.checkDataTypes();
    });
  };
  
  return {
    Semanter: Semanter
  };
});