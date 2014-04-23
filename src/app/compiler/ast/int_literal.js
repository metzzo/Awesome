define(['src/app/compiler/parser/dataType'], function(dataTypeModule) {
  return {
    name: 'Int Literal',
    params: {
      value: 0
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