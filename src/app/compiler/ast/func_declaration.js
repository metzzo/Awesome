define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Function Declaration',
    params: {
      params: [ ],
      returnDataType: null,
      scope: null
    },
    functions: {
      traverse: function(cb) {
        this.params.returnDataType.traverse(cb);
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
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() {
      
      }
    },
    types: {
      
    }
  };
});