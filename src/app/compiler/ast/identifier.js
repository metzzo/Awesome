define(['src/app/compiler/data/dataType', 'src/app/compiler/ast/scope', 'src/app/compiler/data/errorMessages'], function(dataTypeModule, scopeModule, errorMessages) {
  return {
    name: 'Identifier',
    params: {
      name: null,
      identifier: null
    },
    functions: {
      getDataType: function() {
        if (this.params.identifier) {
          return this.params.identifier.params.dataType;
        } else {
          return dataTypeModule.MetaDataTypes.UNKNOWN;
        }
      },
      getIdentifier: function() {
        return this.params.identifier;
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
      }
    }
  };
});