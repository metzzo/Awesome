define([ ], function() {
  return {
    name: 'Variable Declaration',
    params: {
      variables: [ ]
    },
    functions: {
      traverse: function(cb) {
        if (this.params.variables) {
          for (var i = 0; i < this.params.variables.length; i++) {
            var vari = this.params.variables[i];
            if (vari) {
              if (vari.identifier) {
                vari.identifier.traverse(cb);
              }
              if (vari.value) {
                vari.value.traverse(cb);
              }
            }
          }
        }
      }
    },
    types: {
      VARIABLE: 'vari',
      CONSTANT: 'const'
    }
  };
});