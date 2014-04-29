define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Operator',
    params: {
      leftOperand: null,
      rightOperand: null,
      operator: null
    },
    functions: {
      traverse: function(cb) {
        if (this.params.leftOperand) {
          this.params.leftOperand.traverse(cb);
        }
        if (this.params.rightOperand) {
          this.params.rightOperand.traverse(cb);
        }
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      checkDataTypes: function() {
        
      }
    }
  };
});