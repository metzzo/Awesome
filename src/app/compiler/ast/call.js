define(['src/app/compiler/parser/dataType'], function(dataTypeModule) {
  return {
    name: 'Call',
    params: {
      func: null,
      params: [ ]
    },
    functions: {
      traverse: function(cb) {
        if (this.params.func) {
          this.params.func.traverse(cb);
        }
        
        if (this.params.params) {
          for (var i = 0; i < this.params.params.length; i++) {
            if (this.params.params[i]) {
              this.params.params[i].traverse(cb);
            }
          }
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