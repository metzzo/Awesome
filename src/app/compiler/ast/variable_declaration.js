define(['src/app/compiler/data/dataType', 'src/app/compiler/data/identifier', 'src/app/compiler/ast/empty'], function(dataTypeModule, identifierModule, emptyModule) {
  return {
    name: 'Variable Declaration',
    params: {
      variables: [ ]
    },
    functions: {
      init: function() {
        this.params.realVariables = [ ];
        for (var i = 0; i < this.params.variables.length; i++) {
          var variable = this.params.variables[i];
          var dataType = variable.dataType.params.dataType;
          
          // check what we've got
          if (variable.dataType.name === emptyModule.name) {
            dataType = dataTypeModule.MetaDataTypes.UNKNOWN; // nothing :(
          }
          
          this.params.realVariables.push(new identifierModule.Identifier(variable.identifier.params.name, {
            dataType: dataType,
            type: variable.type
          }));
        }
      },
      traverse: function(cb) {
        // add my variables to scope
        var scope = this.getScope();
        if (scope) {
          scope.params.variables = scope.params.variables.concat(this.params.realVariables);
        }
        
        // traverse as normal
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
        return this.params.realVariables;
      },
      processDataTypes: function() {
        // update types!
        for (var i = 0; i < this.params.variables.length; i++) {
          this.params.variables[i].dataType.params.dataType = this.params.realVariables[i].params.dataType;
        }
      },
      checkDataTypes: function() {
        // check dataTypes and do the implicit type checking
        
      }
    },
    types: {
      VARIABLE: 'variable',
      CONSTANT: 'const'
    }
  };
});