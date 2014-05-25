define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Import',
    params: {
      name: null,
      alias: null
    },
    functions: {
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      }
    }
  };
});