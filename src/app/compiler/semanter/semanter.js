define([ ], function() {
  var Semanter = function(mainNode) {
    this.mainNode = mainNode
  };
  
  Semanter.prototype.semant = function() {
    // check datatypes
    this.mainNode.traverse(function(obj) {
      obj.checkDataTypes();
    });
  };
  
  return {
    Semanter: Semanter
  };
});