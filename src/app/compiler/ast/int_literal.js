define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Int Literal',
    params: {
      value: 0
    },
    functions: {
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.INT;
      }
    }
  };
});