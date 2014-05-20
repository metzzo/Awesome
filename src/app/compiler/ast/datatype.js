define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'DataType',
    params: {
      dataType: null
    },
    functions: {
      getDataType: function() {
        return this.params.dataType;
      }
    }
  };
});