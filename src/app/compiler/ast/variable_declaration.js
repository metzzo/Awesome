define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/data/identifier', 'src/app/compiler/ast/empty', 'src/app/compiler/data/operator', 'src/app/compiler/data/errorMessages'], function(_s, dataTypeModule, identifierModule, emptyModule, operatorModule, errorMessages) {
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
          var variable = this.params.variables[i], realVariable = this.params.realVariables[i];
          if (variable.value.name !== emptyModule.name && variable.value.getDataType().isKnown()) {
            realVariable.proposeDataType(variable.value.getDataType());
          }
          
          variable.dataType.params.dataType = realVariable.params.dataType;
        }
      },
      checkDataTypes: function() {
        // check dataTypes and do the implicit typing
        var assign_operator = operatorModule.findOperatorByText('=');
        
        for (var i = 0; i < this.params.variables.length; i++) {
          var variable = this.params.variables[i];
          if (variable.value.name !== emptyModule.name) {
            var dataType = assign_operator.balance(variable.identifier.getDataType(), variable.value.getDataType());
            if (!dataType.isKnown()) {
              this.riseSyntaxError(_s.sprintf(errorMessages.AMBIGUOUS_DATATYPE, variable.identifier.getDataType().toString(), variable.value.getDataType().toString()));
            }
          }
        }
      }
    },
    types: {
      VARIABLE: 'variable',
      CONSTANT: 'const'
    }
  };
});