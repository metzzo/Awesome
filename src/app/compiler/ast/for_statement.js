define([ ], function() {
  return {
    name: 'For',
    params: {
      variable: null,
      collection: null,
      scope: null
    },
    functions: {
      traverse: function(cb) {
        if (this.params.variable) {
          this.params.variable.traverse(cb);
        }
        if (this.params.collection) {
          this.params.collection.traverse(cb);
        }
        if (this.params.scope) {
          this.params.scope.traverse(cb);
        }
      }
    }
  };
});