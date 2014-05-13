define(['src/app/compiler/data/dataType', 'src/app/compiler/data/identifier'], function(dataTypeModule, identifierModule) {
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
          vari.dataType.traverse(cb);
        }
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      getVariables: function() {
        if (!this.params.realVariables) {
          // convert to variables
          this.params.realVariables = [ ];
          for (var i = 0; i < this.params.variables.length; i++) {
            var variable = this.params.variables[i];
            
            this.params.realVariables.push(new identifierModule.Identifier(variable.identifier, {
              dataType: variable.dataType,
              type: variable.type
            }));
          }
        }
        return this.params.realVariables;
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