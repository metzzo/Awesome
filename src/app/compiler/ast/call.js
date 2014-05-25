define(['underscore.string', 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages', 'src/app/compiler/ast/empty'], function(_s, dataTypeModule, errorMessages, emptyModule) {
  return {
    name: 'Call',
    params: {
      func: null,
      signature: null,
      params: [ ]
    },
    functions: {
      traverse: function(cb) {
        this.params.func.traverse(cb);
        
        for (var i = 0; i < this.params.params.length; i++) {
          this.params.params[i].traverse(cb);
        } 
      },
      getDataType: function() {
        if (this.params.signature && this.params.signature.params.type === 'function') {
          return this.params.signature.params.returnType;
        } else {
          return dataTypeModule.MetaDataTypes.UNKNOWN;
        }
      },
      getIntrinsicSignature: function() {
        var params = [];
        for (var i = 0; i < this.params.params.length; i++) {
          params.push(this.params.params[i].getDataType());
        }
        return dataTypeModule.createFunctionDataType(this.getDataType(), params);
      },
      processDataTypes: function() {
        // I need to know whether you are a variable or not
        this.params.func.processDataTypes();
        
        if (this.params.func.getDataType().params.type === 'function') {
          // it is using a variable as function 
          this.params.signature = this.params.func.getDataType();
        } else {
          // it is using a function name as function
          var functions = this.getScope().getFunctions();
          var realFunc = null;
          for (var i = 0; i < functions.length; i++) {
            var func = functions[i];
            if (func.params.name.params.name === this.params.func.params.name) { // TODO: Add overloads?
              realFunc = func;
              break;
            }
          }
          if (realFunc) {
            this.params.signature = realFunc.getDataType();
          } else {
            return; // this.riseSyntaxError(_s.sprintf(errorMessages.FUNCTION_NOT_DEFINED, this.params.func.params.name)); <- ToDO this error messages should anywhere else be rised
          }
          
          if (realFunc.params.realFunction) {
            this.params.func.functions.functionIdentifier(realFunc.params.realFunction);
          }
          
          var intrinsicSignature = this.functions.getIntrinsicSignature();
          var signature = this.params.signature;
          
          if (!intrinsicSignature.matches(signature)) {
            // maybe its just some unknowns / ambigs that are causing this problem?            
            if (!signature.isKnown() || !intrinsicSignature.isKnown()) {
              // signature => intrinsicSignature suggestions
              for (var i = 0; i < signature.params.paramTypes.length; i++) {
                var sig = signature.params.paramTypes[i];
                this.params.params[i].proposeDataType(sig);
              }
              
              // intrinsicSignature => signature suggestions
              // get list of all possible functions
              for (var i = 0; i < intrinsicSignature.params.paramTypes.length; i++) {
                var sig = intrinsicSignature.params.paramTypes[i];
                realFunc.params.params[i].identifier.proposeDataType(sig);
              }
            }
          }
        }
        
      },
      checkDataTypes: function() {
        var intrinsicSignature = this.functions.getIntrinsicSignature();
        var signature = this.params.signature;
        
        if (!intrinsicSignature.matches(signature)) {
          this.riseSyntaxError(_s.sprintf(errorMessages.AMBIGUOUS_DATATYPE, intrinsicSignature.toString(), signature.toString()))
        }
      }
    }
  };
});