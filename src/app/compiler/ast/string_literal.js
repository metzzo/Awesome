define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'String Literal',
    params: {
      value: ''
    },
    functions: {
      traverse: function(cb) {
        
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.STRING;
      },
      checkDataTypes: function() {
      
      }
    }
  };
});