define(['src/app/compiler/data/dataType', 'src/app/compiler/ast/scope', 'src/app/compiler/data/errorMessages'], function(dataTypeModule, scopeModule, errorMessages) {
  var IdentifierTypes = {
    VARIABLE: 'variable',
    FUNCTION: 'function'
  };
  
  return {
    name: 'Identifier',
    params: {
      name: null,
      type: null,
      info: null
    },
    functions: {
      functionIdentifier: function(info) {
        if (this.params.type && this.params.type !== IdentifierTypes.FUNCTION) {
          throw 'Cannot reset type of identifier';
        }
        this.params.type = IdentifierTypes.FUNCTION;
        this.params.info = info;
      },
      variableIdentifier: function(info) {
        if (this.params.type && this.params.type !== IdentifierTypes.VARIABLE) {
          throw 'Cannot reset type of identifier';
        }
        this.params.type = IdentifierTypes.VARIABLE;
        this.params.info = info;
      },
      getDataType: function() {
        if (this.params.type && this.params.info) {
          switch (this.params.type) {
            case IdentifierTypes.VARIABLE:
              return this.params.info.params.dataType;
            case IdentifierTypes.FUNCTION:
              return this.params.info.params.dataType;
            default:
              throw 'Unknown Identifier Type';
          }
        } else {
          return dataTypeModule.MetaDataTypes.UNKNOWN;
        }
      },
      getIdentifier: function() {
        if (this.params.type === IdentifierTypes.VARIABLE) {
          return this.params.info;
        } else {
          return null;
        }
      },
      processDataTypes: function() {
        if (!this.params.type) {
          // try to find my data type pl0x
          var scope = this.getScope();
          var variables = scope.getVariables();
          
          // am I one of these variables?
          for(var i = 0; i < variables.length; i++) {
            var variable = variables[i];
            if (variable.name === this.params.name) {
              this.functions.variableIdentifier(variable);
              break;
            }
          }
        }
      }
    }
  };
});