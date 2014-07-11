define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'For',
    params: {
      variable: null,
      collection: null,
      scope: null
    },
    functions: {
      copy: function() {
        return {
          variable: this.params.variable.copy(),
          collection: this.params.collection.copy(),
          scope: this.params.scope.copy()
        };
      },
      traverse: function(cb) {
        this.params.variable.traverse(cb);
        this.params.collection.traverse(cb);
        this.params.scope.traverse(cb);
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() {
      
      }
    }
  };
});