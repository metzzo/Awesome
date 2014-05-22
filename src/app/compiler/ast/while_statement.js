define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/ast/empty', 'src/app/compiler/data/errorMessages'], function(_s, dataTypeModule, emptyModule, errorMessages) {
  return {
    name: 'While',
    params: {
      condition: null,
      scope: null
    },
    functions: {
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
          var identifier = this.params.condition.getIdentifier();
          if (identifier) {
            identifier.proposeDataType(dataTypeModule.PrimitiveDataTypes.BOOL);
          }
        }
      },
      checkDataTypes: function() {
        var dt = this.params.condition.getDataType();
        if (this.params.condition.name !== emptyModule.name && !dt.matches(dataTypeModule.PrimitiveDataTypes.BOOL)) {
          this.riseSyntaxError(_s.sprintf(errorMessages.UNEXPECTED_DATATYPE, dataTypeModule.PrimitiveDataTypes.BOOL.toString(), dt.toString()))
        }
      }
    }
  };
});