define([ ], function() {
  return {
    name: 'Scope',
    params: {
      nodes: [ ],
      type: 0
    },
    functions: {
      traverse: function(cb) {
        if (this.params.nodes) {
          for (var i = 0; i < this.params.nodes.length; i++) {
            if(this.params.nodes[i]) {
              this.params.nodes[i].traverse(cb);
            }
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