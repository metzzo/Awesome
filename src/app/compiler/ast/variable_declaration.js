define(['src/app/compiler/parser/dataType'], function(dataTypeModule) {
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
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      getVariables: function() {
        return this.variables;
      },
      checkDataTypes: function() {
        
      }
    },
    types: {
      VARIABLE: 'vari',
      CONSTANT: 'const'
    }
  };
});