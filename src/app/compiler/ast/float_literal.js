define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Float Literal',
    params: {
      value: 0.0
    },
    functions: {
      copy: function() {
        return {
          value: this.params.value
        };
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.FLOAT;
      }
    }
  };
});