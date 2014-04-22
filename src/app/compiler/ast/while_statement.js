define([ ], function() {
  return {
    name: 'While',
    params: {
      condition: null,
      scope: null
    },
    functions: {
      traverse: function(cb) {
        if (this.params.condition) {
          this.params.condition.traverse(cb);
        }
        if (this.params.scope) {
          this.params.scope.traverse(cb);
        }
      }
    }
  };
});