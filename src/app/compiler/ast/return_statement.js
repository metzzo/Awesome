define(['src/app/compiler/data/dataType', 'src/app/compiler/ast/scope', 'src/app/compiler/data/errorMessages'], function(dataTypeModule, astScope, errorMessages) {
  return {
    name: 'Return',
    params: {
      ret: null
    },
    functions: {
      copy: function() {
        return {
          ret: this.params.ret
        };
      },
      traverse: function(cb) {
        this.params.ret.traverse(cb);
      },
      getDataType: function(){
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      processDataTypes: function() {
        var funcNode;
        this.backTraverse(function(node) {
          if (node.name === 'Function Declaration') { // must be string cause of cyclic reference in deps
            funcNode = node;
            return true;
          }
        });
        
        if (funcNode) {
          var dt = this.params.ret.getDataType();
          if (dt.isKnown()) {
            funcNode.functions.proposeReturnDataType(dt);
          } else {
            dt = funcNode.params.returnDataType.getDataType();
            if (dt.isKnown()) {
              this.params.ret.proposeDataType(dt);
            }
          }
        } else {
          this.riseSyntaxError(errorMessages.RETURN_IN_FUNCTION);
        }
        
        this.params.ret.use();
      }
    }
  };
});