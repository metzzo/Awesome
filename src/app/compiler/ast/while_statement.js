define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/ast/empty', 'src/app/compiler/data/errorMessages'], function(_s, dataTypeModule, emptyModule, errorMessages) {
  return {
    name: 'While',
    params: {
      condition: null,
      scope: null
    },
    functions: {
      copy: function() {
        return {
          condition: this.params.condition.copy(),
          scope: this.params.scope.copy()
        };
      },
      traverse: function(cb) {
        this.params.condition.traverse(cb);
        this.params.scope.traverse(cb);
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      processDataTypes: function() {
        var dataType = this.params.condition.getDataType();
        if (!dataType.isKnown()) {
          this.params.condition.proposeDataType(dataTypeModule.PrimitiveDataTypes.BOOL);
        }
        
        this.params.condition.use();
      },
      checkDataTypes: function() {
        var dt = this.params.condition.getDataType();
        if (!dt.matches(dataTypeModule.PrimitiveDataTypes.BOOL)) {
          this.riseSyntaxError(_s.sprintf(errorMessages.UNEXPECTED_DATATYPE, dataTypeModule.PrimitiveDataTypes.BOOL.toString(), dt.toString()))
        }
      }
    }
  };
});