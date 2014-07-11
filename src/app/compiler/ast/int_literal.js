define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Int Literal',
    params: {
      value: 0
    },
    functions: {
      copy: function() {
        return {
          value: this.params.value
        };
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.INT;
      }
    }
  };
});