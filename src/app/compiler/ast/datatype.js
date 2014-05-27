define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'DataType',
    params: {
      dataType: null
    },
    functions: {
      getDataType: function() {
        return this.params.dataType;
      },
      proposeDataType: function(dt) {
        if (!this.params.dataType || !this.params.dataType.isKnown()) {
          this.params.dataType = dt;
        }
      }
    }
  };
});