define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages', 'src/app/compiler/ast/empty'], function(_s, dataTypeModule, errorMessages, emptyModule) {
  return {
    name: 'If',
    params: {
      cases: null
    },
    functions: {
      copy: function() {
        return {
          cases: this.astModule.copyNodeArray(this.params.cases)
        };
      },
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
              ifCase.condition.proposeDataType(dataTypeModule.PrimitiveDataTypes.BOOL);
            }
            
            ifCase.condition.use();
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