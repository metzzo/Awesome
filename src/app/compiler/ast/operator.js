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
        return this.params.operator.balance(left, right);
      },
      processDataTypes: function() {
        var left = this.params.leftOperand.getDataType(), right = this.params.rightOperand.getDataType();
        if (left.matches(dataTypeModule.MetaDataTypes.UNKNOWN) && right.isKnown()) {
          var identifier;
          if (identifier = this.params.leftOperand.getIdentifier()) {
            identifier.proposeDataType(right);
          } 
        }
        if (right.matches(dataTypeModule.MetaDataTypes.UNKNOWN) && left.isKnown()) {
          var identifier;
          if (identifier = this.params.rightOperand.getIdentifier()) {
            identifier.proposeDataType(left);
          }
        }
      },
      checkDataTypes: function() {
        var myType = this.getDataType();
        if (myType.matches(dataTypeModule.MetaDataTypes.AMBIGUOUS)) {
          this.riseSyntaxError(errorMessages.AMBIGUOUS_DATATYPE);
        }
      }
    }
  };
});