define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Bool Literal',
    params: {
      value: false
    },
    functions: {
      copy: function() {
        return {
          value: this.params.value
        };
      },
      getDataType: function() {
        return dataTypeModule.PrimitiveDataTypes.BOOL;
      }
    }
  };
});