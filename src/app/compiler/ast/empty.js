define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Empty',
    params: { },
    functions: {
      traverse: function(cb) { },
      getDataType: function() { return dataTypeModule.MetaDataTypes.UNKNOWN; },
      checkDataTypes: function() { }
    }
  };
});