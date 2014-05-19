define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'DataType',
    params: {
      dataType: null
    },
    functions: {
      traverse: function(cb) {
        
      },
      getDataType: function(){
        return this.params.dataType;
      },
      checkDataTypes: function() { }
    }
  };
});