define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  var scope_node;
  return scope_node = {
    name: 'Scope',
    params: {
      nodes: [ ],
      type: 'main',
      variables: [ ]
    },
    functions: {
      init: function() {
        this.params.variables = [ ];
      },
      traverse: function(cb) {
        // keep track of current possible variables
        var oldVariables = this.params.variables;
        this.params.variables = [ ];
        // add variables from parent scope but only if the current scope is a LOCAL scope
        if (this.parent && this.params.type === scope_node.types.LOCAL) {
          this.params.variables = this.params.variables.concat(this.parent.getVariables());
        }
        
        try {
          for (var i = 0; i < this.params.nodes.length; i++) {
            this.params.nodes[i].traverse(cb);
          }
        } finally {
          this.params.variables = oldVariables; // set old variables
        }
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() {
        
      },
      getVariables: function() {
        return this.params.variables;
      }
    },
    types: {
      MAIN: 'main', // "first" scope
      FUNCTION: 'function', // function
      LOCAL: 'local' // if, while, ...
    }
  };
});