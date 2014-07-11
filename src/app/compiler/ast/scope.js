define(['src/app/compiler/data/dataType', 'src/app/compiler/ast/func_declaration', 'src/app/compiler/ast/empty'], function(dataTypeModule, funcDeclModule, emptyModule) {
  var scope_node;
  return scope_node = {
    name: 'Scope',
    params: {
      nodes: [ ],
      type: 'main',
      variables: [ ]
    },
    functions: {
      copy: function() {
        return {
          nodes: this.astModule.copyNodeArray(this.params.nodes),
          type: this.params.type,
          variables: [ ]
        };
      },
      init: function() {
        this.params.variables = [ ];
      },
      traverse: function(cb) {
        // keep track of current possible variables
        var oldVariables = this.params.variables;
        this.params.variables = [ ];
        // add variables from parent scope but only if the current scope is a LOCAL scope
        switch (this.params.type) {
          case scope_node.types.LOCAL:
            if (this.getScope()) {
              this.params.variables = this.params.variables.concat(this.getScope().getVariables());
            }
            break;
          case scope_node.types.FUNCTION:
            // add parameters!
            if (this.parent && this.parent.name === funcDeclModule.name) {
              this.params.variables = this.params.variables.concat(this.parent.functions.getParameters());
            }
            break;
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
      getFunctions: function(modules) {
        if (!modules) {
          modules = [ ];
        }
        
        var functions = [ ];
        if (this.getScope()) {
          functions = functions.concat(this.getScope().getFunctions(modules));
        }
        for (var i = 0; i < this.params.nodes.length; i++) {
          var node = this.params.nodes[i];
          if (node.name !== scope_node.name) {
            // function?
            var funcs = node.getFunctions(modules);
            for (var j = 0; j < funcs.length; j++) {
              functions.push(funcs[j]);
            }
          }
        }
        return functions;
      },
      append: function(node) {
        this.params.nodes.push(node);
        node.parent = this;
      }
    },
    types: {
      MAIN: 'main', // "first" scope
      FUNCTION: 'function', // function
      LOCAL: 'local' // if, while, ...
    }
  };
});