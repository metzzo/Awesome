define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Bool Literal',
    params: {
      value: false
    },
    functions: {
      traverse: function(cb) {
        
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.BOOL;
      },
      checkDataTypes: function() { }
    }
  };
});