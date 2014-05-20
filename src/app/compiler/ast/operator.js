define(['src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages'], function(dataTypeModule, errorMessages) {
  return {
    name: 'Operator',
    params: {
      leftOperand: null,
      rightOperand: null,
      operator: null
    },
    functions: {
      traverse: function(cb) {
        this.params.leftOperand.traverse(cb);
        this.params.rightOperand.traverse(cb);
      },
      getDataType: function() {
        var left = this.params.leftOperand.getDataType(), right = this.params.rightOperand.getDataType();
        return left.balance(right);
      },
      checkDataTypes: function() {
        var myType = this.getDataType();
        if (myType.matches(dataTypeModule.MetaDataTypes.AMBIGUOUS)) {
          this.riseSyntaxError(errorMessages.AMBIGUOUS_TYPE);
        }
      }
    }
  };
});