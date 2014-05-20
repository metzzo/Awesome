define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages', 'src/app/compiler/ast/empty'], function(_s, dataTypeModule, errorMessages, emptyModule) {
  return {
    name: 'If',
    params: {
      cases: null
    },
    functions: {
      traverse: function(cb) {
        for (var i = 0; i < this.params.cases.length; i++) {
          var ifCase = this.params.cases[i];
          ifCase.condition.traverse(cb);
          ifCase.scope.traverse(cb);
        }
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      processDataTypes: function() {
        for (var i = 0; i < this.params.cases.length; i++) {
          var ifCase = this.params.cases[i];
          if (ifCase.condition) {
            var dataType = ifCase.condition.getDataType();
            if (!dataType.isKnown()) {
              var identifier = ifCase.condition.getIdentifier();
              if (identifier) {
                identifier.proposeDataType(dataTypeModule.PrimitiveDataTypes.BOOL);
              }
            }
          }
        }
      },
      checkDataTypes: function() {
        for (var i = 0; i < this.params.cases.length; i++) {
          var ifCase = this.params.cases[i];
          if (ifCase.condition) {
            var dt = ifCase.condition.getDataType();
            if (ifCase.condition.name !== emptyModule.name && !dt.matches(dataTypeModule.PrimitiveDataTypes.BOOL)) {
              this.riseSyntaxError(_s.sprintf(errorMessages.UNEXPECTED_DATATYPE, dataTypeModule.PrimitiveDataTypes.BOOL.toString(), dt.toString()))
            }
          }
        }
      }
    }
  };
});