define(['src/app/compiler/parser/dataType'], function(dataTypeModule) {
  return {
    name: 'If',
    params: {
      cases: null
    },
    functions: {
      traverse: function(cb) {
        if (this.params.cases) {
          for (var i = 0; i < this.params.cases.length; i++) {
            var ifCase = this.params.cases[i];
            if (ifCase) {
              if (!!ifCase.condition) {
                ifCase.condition.traverse(cb);
              }
              if (ifCase.scope) {
                ifCase.scope.traverse(cb);
              }
            }
          }
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
              // throw 'YOLO';
            }
          }
        }
      }
    }
  };
});