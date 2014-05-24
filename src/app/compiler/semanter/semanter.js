define([ 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages' ], function(dataTypeModule, errorMessages) {
  var Semanter = function(mainNode) {
    this.mainNode = mainNode
  };
  
  Semanter.prototype.semant = function() {
    // type erasure
    var anyUnknown, oldAnyUnknown;
    do {
      oldAnyUnknown = anyUnknown;
      anyUnknown = 0;
      this.mainNode.traverse(function(obj) {
        obj.processDataTypes();
        
        var dataType = obj.getDataType();
        if (dataType.matches(dataTypeModule.MetaDataTypes.UNKNOWN)) {
          anyUnknown++;
        }
      });
    } while(anyUnknown != oldAnyUnknown && anyUnknown !== 0); // as long as it is able to resolve data types, repeat this step
    
    if (anyUnknown != 0) {
      this.mainNode.traverse(function(obj) {
        var dataType = obj.getDataType();
        if (!dataType.isKnown()) {
          obj.riseSyntaxError(errorMessages.CANNOT_RESOLVE_DATATYPE);
        }
      });
    } else { // no problem with the types (so far)
      // check data Types
      this.mainNode.traverse(function(obj) {
        obj.checkDataTypes();
      });
    }
  };
  
  return {
    Semanter: Semanter
  };
});