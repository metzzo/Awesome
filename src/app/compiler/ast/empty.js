define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Empty',
    params: { },
    functions: {
      getDataType: function() { return dataTypeModule.PrimitiveDataTypes.VOID; },
    }
  };
});