define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  var scope_node;
  return scope_node = {
    name: 'Scope',
    params: {
      nodes: [ ],
      type: 'main'
    },
    functions: {
      traverse: function(cb) {
        for (var i = 0; i < this.params.nodes.length; i++) {
          this.params.nodes[i].traverse(cb);
        }
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() { },
      getVariables: function() {
        // TODO: cache the return of this function
        var varis = [ ];
        var scope = this, beforeScope = null;
        do {
          for (var i = 0; i < this.params.nodes.length; i++) {
            var node = this.params.nodes[i];
            if (node && node.name !== 'Scope') {
              var currentVaris = node.getVariables();
              if (currentVaris && currentVaris.length > 0) {
                varis = varis.concat(currentVaris);
              }
            }
          }
          
          beforeScope = scope
          scope = scope.parent;
        } while(scope && (scope.params.type === scope_node.types.LOCAL || (beforeScope.params.type === scope_node.types.LOCAL && (beforeScope.params.type === scope_node.types.MAIN || beforeScope.params.type === scope_node.types.FUNCTION))));
        
        return varis;
      }
    },
    types: {
      MAIN: 'main', // "first" scope
      FUNCTION: 'function', // function
      LOCAL: 'local' // if, while, ...
    }
  };
});