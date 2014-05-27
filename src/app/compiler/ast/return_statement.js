define(['src/app/compiler/data/dataType', 'src/app/compiler/ast/scope', 'src/app/compiler/data/errorMessages'], function(dataTypeModule, astScope, errorMessages) {
  return {
    name: 'Return',
    params: {
      ret: null
    },
    functions: {
      traverse: function(cb) {
        this.params.ret.traverse(cb);
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      processDataTypes: function() {
        var funcNode;
        this.backTraverse(function(node) {
          if (node.params.type === 'function') { // must be string cause of cyclic reference in deps
            funcNode = node.parent;
            return true;
          }
        });
        
        if (funcNode) {
          var dt = ret.getDataType();
          if (dt.isKnown()) {
            funcNode.proposeDataType(dt);
          } else {
            dt = funcNode.params.returnDataType;
            if (dt.isKnown()) {
              ret.proposeDataType(dt);
            }
          }
        } else {
          this.riseSyntaxError(errorMessages.RETURN_IN_FUNCTION);
        }
      }
    }
  };
});