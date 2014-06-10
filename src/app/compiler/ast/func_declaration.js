define(['src/app/compiler/data/dataType', 'src/app/compiler/data/identifier', 'src/app/compiler/ast/empty', 'src/app/compiler/ast/variable_declaration', 'src/app/compiler/data/operator', 'src/app/compiler/data/errorMessages', 'src/app/compiler/ast/return_statement'], function(dataTypeModule, identifierModule, emptyModule, variableDeclModule, operatorModule, errorMessages, retModule) {
  return {
    name: 'Function Declaration',
    params: {
      params: [ ],
      returnDataType: null,
      scope: null,
      name: null, // if first class function: empty, if normal: identifier,
      realFunction: null, // identifier of this function (just used if normal function)
      realParameters: null, // identifiers of the parameters of this function (just used if normal function)
      hasRegisteredConversions: false
    },
    functions: {
      init: function() {
        this.params.realParameters = [ ];
        
        for (var i = 0; i < this.params.params.length; i++) {
          var parameter = this.params.params[i];
          var dataType = parameter.dataType.params.dataType;
          
          var identifier;
          this.params.realParameters.push(identifier = new identifierModule.Identifier(parameter.identifier.params.name, {
            dataType: dataType,
            type: parameter.type
          }));
          this.params.params[i].identifier.functions.variableIdentifier(identifier);
        }
      },
      traverse: function(cb) {
        this.params.returnDataType.traverse(cb);
        this.params.name.traverse(cb);
        
        for (var i = 0; i < this.params.params.length; i++) {
          if (this.params.params[i]) {
            var param = this.params.params[i];
            param.identifier.traverse(cb);
            param.dataType.traverse(cb);
            param.value.traverse(cb);
          }
        }
        
        this.params.scope.traverse(cb);
      },
      getDataType: function() {
        var paramTypes = [ ];
        for (var i = 0; i < this.params.params.length; i++) {
          var param = this.params.params[i];
          var dt;
          if (param.identifier.functions.getIdentifier() && (dt = param.identifier.getDataType()).isKnown()) {
            paramTypes.push(dt);
          } else {
            paramTypes.push(dataTypeModule.MetaDataTypes.UNKNOWN);
          }
        }
        
        return dataTypeModule.createFunctionDataType(this.params.returnDataType.getDataType(), paramTypes);
      },
      processDataTypes: function() {
        if (this.params.scope.name === emptyModule.name && !this.getDataType().isKnown()) { // rise error, because no type inference is allowed
          this.riseSyntaxError(errorMessages.CANNOT_RESOLVE_DATATYPE);
        }
        
        // update parameters
        for (var i = 0; i < this.params.params.length; i++) {
          this.params.params[i].dataType.params.dataType = this.params.realParameters[i].params.dataType;
        }
        
        if (this.params.returnDataType.getDataType().matches(dataTypeModule.MetaDataTypes.UNKNOWN)) {
          // if there is know return => i am void!
          var thereIsNoRet = true;
          this.params.scope.traverse(function(node) {
            if (node.name === retModule.name) {
              thereIsNoRet = false;
              return true;
            }
          });
          // no return defined
          if (thereIsNoRet) {
            this.params.returnDataType.params.dataType = dataTypeModule.PrimitiveDataTypes.VOID;
          }
        }
        
        var dataType = this.getDataType();
        if (dataType.isKnown()) {
          if (this.params.name.name !== emptyModule.name && !this.params.realFunction) {
            // now set the realFunction bro
            this.params.realFunction = new identifierModule.Identifier(this.params.name.params.name, {
              dataType: dataType,
              type: variableDeclModule.types.CONSTANT
            });
            
            if (this.params.name.functions.isNotSetYet()) {
              this.params.name.functions.functionIdentifier(this.params.realFunction);
            }
          }
          
          if (!this.params.hasRegisteredConversions) {
            this.params.hasRegisteredConversions = true;
            
            operatorModule.Conversions.AssignOperator.push({
              from: [dataType, dataType],
              to: dataType
            });
          }
        }
      },
      getParameters: function() {
        return this.params.realParameters;
      },
      getVariables: function() {
        if (this.realFunction) {
          return [ this.params.realFunction ]
        } else {
          return [];
        }
      },
      getFunctions: function() {
        return [ this ];
      },
      proposeReturnDataType: function(dt) {
        this.params.returnDataType.proposeDataType(dt);
      },
      proposeDataType: function(dt) {
        if (this.params.realFunction) {
          this.params.realFunction.proposeDataType(dt);
        } else if (dt.name === 'function' && dt.params.paramTypes.length === this.params.realParameters.length) {
          for (var i = 0; i < dt.params.paramTypes.length; i++) {
            var param1 = dt.params.paramTypes[i];
            var param2 = this.params.realParameters[i];
            
            param2.proposeDataType(param1);
          }
        }
      },
      checkDataTypes: function() { }
    }
  };
});