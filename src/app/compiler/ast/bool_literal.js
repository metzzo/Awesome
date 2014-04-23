define(['src/app/compiler/parser/dataType'], function(dataTypeModule) {
  return {
    name: 'Bool Literal',
    params: {
      value: false
    },
    functions: {
      traverse: function(cb) {
        
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() {
        
      }
    }
  };
});