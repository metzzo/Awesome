define(['src/app/compiler/data/dataType', 'src/app/compiler/ast/scope'], function(dataTypeModule, scopeModule) {
  return {
    name: 'Identifier',
    params: {
      name: null,
      identifier: null
    },
    functions: {
      traverse: function(cb) {
        
      },
      getDataType: function() {
        if (this.params.identifier) {
          return this.params.identifier.params.dataType.params.dataType;
        } else {
          return dataTypeModule.MetaDataTypes.UNKNOWN;
        }
      },
      processDataTypes: function() {
        // try to find my data type pl0x
        var scope = this.getScope();
        var variables = scope.getVariables();
        
        // am I one of these variables?
        for(var i = 0; i < variables.length; i++) {
          var variable = variables[i];
          if (variable.name === this.params.name) {
            this.params.identifier = variable; // yes I AM \o/
            break;
          }
        }
      },
      checkDataTypes: function() {
        
      }
    }
  };
});