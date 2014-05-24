define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages'], function(_s, dataTypeModule, errorMessages) {
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
          this.params.leftOperand.proposeDataType(right);
        }
        if (right.matches(dataTypeModule.MetaDataTypes.UNKNOWN) && left.isKnown()) {
          this.params.rightOperand.proposeDataType(left);
        }
      },
      checkDataTypes: function() {
        var myType = this.getDataType();
        if (!myType.isKnown()) {
          this.riseSyntaxError(_s.sprintf(errorMessages.AMBIGUOUS_DATATYPE, this.params.leftOperand.getDataType().toString(), this.params.rightOperand.getDataType().toString()));
        }
      },
      proposeDataType: function(dataType) {
        if (!this.params.leftOperand.getDataType().isKnown()) {
          this.params.leftOperand.proposeDataType(dataType);
        }
        if (!this.params.rightOperand.getDataType().isKnown()) {
          this.params.rightOperand.proposeDataType(dataType);
        }
      }
    }
  };
});