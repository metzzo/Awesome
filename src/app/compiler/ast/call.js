define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Call',
    params: {
      func: null,
      params: [ ]
    },
    functions: {
      traverse: function(cb) {
        this.params.func.traverse(cb);
        
        for (var i = 0; i < this.params.params.length; i++) {
          this.params.params[i].traverse(cb);
        } 
      },
      getDataType: function(){
        return dataTypeModule.MetaDataTypes.UNKNOWN;
      },
      checkDataTypes: function() {
        
      }
    }
  };
});