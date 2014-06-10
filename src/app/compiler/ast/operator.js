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
        var right = this.params.rightOperand.getDataType();
        this.params.leftOperand.proposeDataType(right);
        
        var left = this.params.leftOperand.getDataType();
        this.params.rightOperand.proposeDataType(left);
      },
      checkDataTypes: function() {
        var myType = this.getDataType();
        if (!myType.isKnown()) {
          this.riseSyntaxError(_s.sprintf(errorMessages.AMBIGUOUS_DATATYPE, this.params.leftOperand.getDataType().toString(), this.params.rightOperand.getDataType().toString()));
        }
        
        // check if mutating a const
        var isMutable = this.params.leftOperand.isMutable();
        if (!isMutable && this.params.operator.params.mutates) {
          this.riseSyntaxError(errorMessages.CANNOT_MUTATE);
        }
      },
      proposeDataType: function(dataType) {
        this.processDataTypes();
        
        this.params.leftOperand.proposeDataType(dataType);
        this.params.rightOperand.proposeDataType(dataType);
      }
    }
  };
});