define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'DataType',
    params: {
      dataType: null
    },
    functions: {
      copy: function() {
        return {
          dataType: this.params.dataType // dataTypes are inmutable
        };
      },
      getDataType: function() {
        return this.params.dataType;
      },
      proposeDataType: function(dt) {
        this.params.dataType = this.params.dataType.proposeDataType(dt);
      }
    }
  };
});