define([ 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages' ], function(dataTypeModule, errorMessages) {
  var Semanter = function(mainNodes) {
    if (!(mainNodes instanceof Array)) {
      this.mainNodes = [ mainNodes ];
    } else {
      this.mainNodes = mainNodes;
    }
  };
  
  Semanter.prototype.semant = function() {    
    // type inference
    var anyUnknown, oldAnyUnknown = 0;
    
    var cleanUp = (function() {
      // remove all unused nodes
      for (var i = 0; i < this.mainNodes.length; i++) {
        var mainNode = this.mainNodes[i];
        mainNode.traverse(function(obj) {
          if (!obj.isUsed()) {
            obj.remove();
          }
        });
      }
    }).bind(this);
    
    var resolver = (function() {
      for (var i = 0; i < this.mainNodes.length; i++) {
        var mainNode = this.mainNodes[i];
        mainNode.traverse(function(obj) {
          obj.processDataTypes();
          
          var dataType = obj.getDataType();
          if (dataType.matches(dataTypeModule.MetaDataTypes.UNKNOWN) && obj.isUsed()) {
            anyUnknown++;
          }
        });
      }
    }).bind(this);
    
    do {
      oldAnyUnknown = anyUnknown;
      anyUnknown = 0;
      resolver();
    } while(anyUnknown != oldAnyUnknown && anyUnknown !== 0); // as long as it is able to resolve data types, repeat this step
    
    cleanUp();
    resolver(); // to get every reference n stuff up 2 date
    
    if (anyUnknown != 0) {
      for (var i = 0; i < this.mainNodes.length; i++) {
        var mainNode = this.mainNodes[i];
        mainNode.traverse(function(obj) {
          var dataType = obj.getDataType();
          if (!dataType.isKnown()) {
            console.log(obj.isUsed());
            obj.riseSyntaxError(errorMessages.CANNOT_RESOLVE_DATATYPE);
          }
        });
      }
    } else { // no problem with the types (so far)
      // check data Types
      for (var i = 0; i < this.mainNodes.length; i++) {
        var mainNode = this.mainNodes[i];
        mainNode.traverse(function(obj) {
          if (obj.isUsed()) {
            obj.checkDataTypes();
          }
        });
      }
    }
  };
  
  return {
    Semanter: Semanter
  };
});