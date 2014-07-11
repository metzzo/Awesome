define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Empty',
    params: { },
    functions: {
      copy: function() {
        return { };
      },
      getDataType: function() { return dataTypeModule.PrimitiveDataTypes.VOID; },
    }
  };
});