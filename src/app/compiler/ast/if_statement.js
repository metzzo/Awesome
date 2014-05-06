define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages'], function(_s, dataTypeModule, errorMessages) {
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
      checkDataTypes: function() {
        for (var i = 0; i < this.params.cases.length; i++) {
          var ifCase = this.params.cases[i];
          if (ifCase.condition) {
            var dt = ifCase.condition.getDataType();
            if (!dt.matches(dataTypeModule.PrimitiveDataTypes.BOOL)) {
              this.riseSyntaxError(_s.sprintf(errorMessages.UNEXPECTED_DATATYPE, dataTypeModule.PrimitiveDataTypes.BOOL.toString(), dt.toString()))
            }
          }
        }
      }
    }
  };
});