define(['src/app/compiler/parser/dataType'], function(dataTypeModule) {
  return {
    name: 'DataType',
    params: {
      dataType: null
    },
    functions: {
      traverse: function(cb) {
        
      },
      getDataType: function(){
        return dataType;
      },
      checkDataTypes: function() { }
    }
  };
});