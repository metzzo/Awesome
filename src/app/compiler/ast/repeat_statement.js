define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Repeat',
    params: {
      condition: null,
      scope: null
    },
    functions: {
      traverse: function(cb) {
        this.params.condition.traverse(cb);
        this.params.scope.traverse(cb);
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() {
      
      }
    }
  };
});