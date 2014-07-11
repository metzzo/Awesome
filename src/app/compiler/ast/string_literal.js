define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'String Literal',
    params: {
      value: ''
    },
    functions: {
      copy: function() {
        return {
          value: this.params.value
        };
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.STRING;
      }
    }
  };
});