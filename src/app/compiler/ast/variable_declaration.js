define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Variable Declaration',
    params: {
      variables: [ ]
    },
    functions: {
      traverse: function(cb) {
        for (var i = 0; i < this.params.variables.length; i++) {
          var vari = this.params.variables[i];
          vari.identifier.traverse(cb);
          vari.value.traverse(cb);
        }
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      getVariables: function() {
        return this.params.variables;
      },
      checkDataTypes: function() {
        
      }
    },
    types: {
      VARIABLE: 'variable',
      CONSTANT: 'const'
    }
  };
});