define(['src/app/compiler/parser/dataType'], function(dataTypeModule) {
  return {
    name: 'String Literal',
    params: {
      value: ''
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