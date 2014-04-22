define([ ], function() {
  return {
    name: 'Function Declaration',
    params: {
      params: [ ],
      returnDataType: null,
      scope: null
    },
    functions: {
      traverse: function(cb) {
        if (this.params.returnDataType) {
          this.params.returnDataType.traverse(cb);
        }
        if (this.params.params) {
          for (var i = 0; i < this.params.params.length; i++) {
            if (this.params.params[i]) {
              this.params.params[i].traverse(cb);
            }
          }
        }
        if (this.params.scope) {
          this.params.scope.traverse(cb);
        }
      }
    },
    types: {
      
    }
  };
});