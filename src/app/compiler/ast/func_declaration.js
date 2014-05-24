define(['src/app/compiler/data/dataType', 'src/app/compiler/data/identifier', 'src/app/compiler/ast/empty', 'src/app/compiler/ast/variable_declaration'], function(dataTypeModule, identifierModule, emptyModule, variableDeclModule) {
  var astModule;
  
  return {
    name: 'Function Declaration',
    params: {
      params: [ ],
      returnDataType: null,
      scope: null,
      name: null, // if first class function: empty, if normal: identifier,
      realFunction: null // identifier of this function (just used if normal function)
    },
    functions: {
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
          if ((dt = param.identifier.identifier.getDataType()).isKnown()) {
            paramTypes.push(dt);
          } else {
            paramTypes.push(dataTypeModule.MetaDataTypes.UNKNOWN);
          }
        }
        
        return dataTypeModule.createFunctionDataType(this.params.returnDataType.getDataType(), paramTypes);
      },
      processDataTypes: function() {
        // try to guess my return type if returnDataType is unknown
        if (this.params.returnDataType.getDataType().matches(dataTypeModule.MetaDataTypes.UNKNOWN)) {
          // this.params.scope.traverse(function(node) {
            // TODO!
            // if node === return statement: myDataType == return Statement data Type, exit
          // });
          // Until return is implemented:
          this.params.returnDataType.params.dataType = dataTypeModule.PrimitiveDataTypes.VOID;
        }
        
        if (this.params.name !== emptyModule.name && !this.params.realFunction) {
          var dataType = this.getDataType();
          // is everything known from this function?
          if (dataType.isKnown()) {
            // know set the realFunction bro
            this.params.realFunction = new identifierModule.Identifier(this.params.name.params.name+dataType.juggleName(), {
              dataType: dataType,
              type: variableDeclModule.types.CONSTANT
            });
            
            this.params.name.functions.functionIdentifier(this.params.realFunction);
          }
        }
      },
      getVariables: function() {
        if (this.realFunction) {
          return [ this.params.realFunction ]
        } else {
          return [];
        }
      },
      checkDataTypes: function() {
        
      }
    }
  };
});