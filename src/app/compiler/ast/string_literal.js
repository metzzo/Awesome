define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'String Literal',
    params: {
      value: ''
    },
    functions: {
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.STRING;
      }
    }
  };
});