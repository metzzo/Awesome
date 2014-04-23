define(['src/app/compiler/parser/dataType'], function(dataTypeModule) {
  return {
    name: 'Repeat',
    params: {
      condition: null,
      scope: null
    },
    functions: {
      traverse: function(cb) {
        if (this.params.condition) {
          this.params.condition.traverse(cb);
        }
        if (this.params.scope) {
          this.params.scope.traverse(cb);
        }
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() {
      
      }
    }
  };
});