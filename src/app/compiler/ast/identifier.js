define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Identifier',
    params: {
      name: null
    },
    functions: {
      traverse: function(cb) {
        
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() { }
    }
  };
});