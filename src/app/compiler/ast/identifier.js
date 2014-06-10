define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/ast/scope', 'src/app/compiler/ast/func_declaration', 'src/app/compiler/data/errorMessages'], function(_s, dataTypeModule, scopeModule, funcDeclModule, errorMessages) {
  var IdentifierTypes = {
    VARIABLE: 'variable',
    FUNCTION: 'function',
    FUNCTIONDECL: 'funcdecl'
  };
  
  return {
    name: 'Identifier',
    params: {
      name: null,
      type: null,
      info: null
    },
    functions: {
      isNotSetYet: function() {
        return !this.params.type;
      },
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
      functionDeclIdentifier: function(info) {
        if (this.params.type && this.params.type !== IdentifierTypes.FUNCTIONDECL) {
          throw 'Cannot reset type of identifier';
        }
        this.params.type = IdentifierTypes.FUNCTIONDECL;
        this.params.info = info;
      },
      isMutable: function() {
        if (this.params.type === IdentifierTypes.VARIABLE && this.params.info) {
          return this.params.info.params.type !== 'const';
        } else {
          return false;
        }
      },
      getDataType: function() {
        if (this.params.type && this.params.info) {
          switch (this.params.type) {
            case IdentifierTypes.VARIABLE:
            case IdentifierTypes.FUNCTION:
              return this.params.info.params.dataType;
            case IdentifierTypes.FUNCTIONDECL:
              return this.params.info.getDataType();
            default:
              throw 'Unknown Identifier Type';
          }
        } else {
          return dataTypeModule.MetaDataTypes.UNKNOWN;
        }
      },
      getIdentifier: function() {
        return this.params.info;
      },
      proposeDataType: function(dataType) {
        if (!this.params.type) {
          // maybe process will fix this?
          this.processDataTypes();
        }
        
        if (this.params.type === IdentifierTypes.VARIABLE) {
          this.params.info.proposeDataType(dataType);
        } else {
          return null;
        }
      },
      processDataTypes: function() {
        if (!this.params.type) {
          // try to find my data type pl0x
          
          // is this a parameter?
          var scope;
          if (this.parent && this.parent.name === funcDeclModule.name) {
            scope = this.parent.params.scope; // yep, so please take the scope of the function
          } else {
            scope = this.getScope();
          }
          var variables = scope.getVariables(); // no, normal scope plz!
          
          // am I one of these variables?
          for(var i = 0; i < variables.length; i++) {
            var variable = variables[i];
            if (variable.name === this.params.name) {
              this.functions.variableIdentifier(variable);
              return;
            }
          }
          
          var functions = scope.functions.getFunctions();
          var maybeFunc = null;
          // maybe I am a function?
          for (var i = 0; i < functions.length; i++) {
            var func = functions[i];
            if (func.params.name.params.name === this.params.name) {
              if (maybeFunc) {
                // cannot be resolved :(
                maybeFunc = null;
                break;
              } else {
                maybeFunc = func;
              }
            }
          }
          if (maybeFunc) {
            this.functions.functionDeclIdentifier(maybeFunc);
          }
        }
      },
      checkDataTypes: function() {
        // identifier with void are not allowed
        if (this.getDataType().matches(dataTypeModule.PrimitiveDataTypes.VOID)) {
          this.riseSyntaxError(_s.sprintf(errorMessages.INVALID_DATATYPE, dataTypeModule.PrimitiveDataTypes.VOID.name));
        }
      },
      getDecoratedName: function() {
        return this.params.name+this.getDataType().decorateName();
      }
    }
  };
});