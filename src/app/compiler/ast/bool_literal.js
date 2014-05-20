define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Bool Literal',
    params: {
      value: false
    },
    functions: {
      getDataType: function() {
        return dataTypeModule.PrimitiveDataTypes.BOOL;
      }
    }
  };
});