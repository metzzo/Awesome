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
              var param = this.params.params[i];
              if (param.identifier) {
                param.identifier.traverse(cb);
              }
              if (param.dataType) {
                param.dataType.traverse(cb);
              }
              if (param.value) {
                param.value.traverse(cb);
              }
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