define(['src/app/compiler/data/dataType', 'src/app/compiler/ast/func_declaration'], function(dataTypeModule, funcDeclModule) {
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
        if (this.getScope() && this.params.type === scope_node.types.LOCAL) {
          this.params.variables = this.params.variables.concat(this.getScope().getVariables());
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
      getVariables: function() {
        return this.params.variables;
      },
      getFunctions: function() {
        var functions = [ ];
        if (this.getScope()) {
          functions = functions.concat(this.getScope().functions.getFunctions());
        }
        for (var i = 0; i < this.params.nodes.length; i++) {
          var node = this.params.nodes[i];
          // function?
          if (node.name === funcDeclModule.name) {
            functions.push(node);
          }
        }
      }
    },
    types: {
      MAIN: 'main', // "first" scope
      FUNCTION: 'function', // function
      LOCAL: 'local' // if, while, ...
    }
  };
});