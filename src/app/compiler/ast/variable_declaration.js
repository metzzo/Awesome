define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/data/identifier', 'src/app/compiler/ast/empty', 'src/app/compiler/data/operator', 'src/app/compiler/data/errorMessages', 'src/app/compiler/ast/datatype'], function(_s, dataTypeModule, identifierModule, emptyModule, operatorModule, errorMessages, dataTypeAstModule) {
  var astModule;
  return {
    name: 'Variable Declaration',
    params: {
      variables: [ ],
      realVariables: [ ]
    },
    functions: {
      copy: function() {
        return {
          variables: this.astModule.copyNodeArray(this.params.variables),
          realVariables: [ ]
        };
      },
      init: function() {
        this.params.realVariables = [ ];
        for (var i = 0; i < this.params.variables.length; i++) {
          var variable = this.params.variables[i];
          var dataType = variable.dataType.params.dataType;
          
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
        return dataTypeModule.PrimitiveDataTypes.VOID; // TODO: If just one variable is defined in here, return the datatype of this variable
      },
      getVariables: function() {
        return this.params.realVariables;
      },
      processDataTypes: function() {
        // update types!
        for (var i = 0; i < this.params.variables.length; i++) {
          var variable = this.params.variables[i], realVariable = this.params.realVariables[i];
          if (variable.value.name !== emptyModule.name) {
            realVariable.proposeDataType(variable.value.getDataType());
          }
          
          if (!variable.value.getDataType().isKnown()) {
            variable.value.proposeDataType(realVariable.params.dataType);
          }
          if (variable.value.getDataType().isKnown()) {
            variable.identifier.proposeDataType(variable.value.getDataType());
          }
          
          variable.dataType.params.dataType = realVariable.params.dataType;
          
          variable.value.use();
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