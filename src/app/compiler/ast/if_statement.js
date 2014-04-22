define([ ], function() {
  return {
    name: 'If',
    params: {
      cases: null
    },
    functions: {
      traverse: function(cb) {
        if (this.params.cases) {
          for (var i = 0; i < this.params.cases.length; i++) {
            var ifCase = this.params.cases[i];
            if (ifCase) {
              if (!!ifCase.condition) {
                ifCase.condition.traverse(cb);
              }
              if (ifCase.scope) {
                ifCase.scope.traverse(cb);
              }
            }
          }
        }
      }
    }
  };
});