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
        
        var intrinsicSignature = this.functions.getIntrinsicSignature();
        if (this.params.func.getDataType().params.type === 'function' && this.params.func.params.type !== 'funcdecl') {
          // it is using a variable as function => propose my intrinsic signature
          this.params.func.proposeDataType(intrinsicSignature);
          this.params.signature = this.params.func.getDataType();
        } else {
          // it is using a function name as function
          var functions = this.getScope().getFunctions();
          var realFunc = null;
          
          for (var i = 0; i < functions.length; i++) {
            var func = functions[i];
            if (func.params.name.params.name === this.params.func.params.name) {
              // check datatypes
              var funcParams = func.params.params;
              if (funcParams.length === intrinsicSignature.params.paramTypes.length) {
                var signatureDoesNotMatch = false;
                for (var j = 0; j < funcParams.length; j++) {
                  var dt1, dt2;
                  dt1 = intrinsicSignature.params.paramTypes[j];
                  dt2 = funcParams[j].dataType.getDataType();
                  if (dt1.isKnown() && !dt2.isKnown()) {
                    // propose my datatype, but only if i would be the only possible function
                    funcParams[j].identifier.proposeDataType(dt1);
                    
                    // TODO: implement function duck typing here
                  }
                  
                  if (!dt1.matches(dt2) && !(!dt1.isKnown() || !dt2.isKnown())) {
                    signatureDoesNotMatch = true;
                    break;
                  }
                }
                if (!signatureDoesNotMatch) {
                  realFunc = func;
                  break;
                }
              }
            }
          }
          if (realFunc) {
            this.params.signature = realFunc.getDataType();
          } else { 
            // maybe my intrinsic signature helps the function?
            this.params.func.proposeDataType(this.functions.getIntrinsicSignature());
            return;
          }
          
          if (realFunc.params.realFunction && this.params.func.functions.isNotSetYet()) {
            this.params.func.functions.functionIdentifier(realFunc.params.realFunction);
          }
          
          
          var signature = this.params.signature;
          intrinsicSignature = this.functions.getIntrinsicSignature();
          
          if (!intrinsicSignature.matches(signature)) {
            // maybe its just some unknowns / ambigs that are causing this problem?            
            if (!signature.isKnown() || !intrinsicSignature.isKnown()) {
              // signature => intrinsicSignature suggestions, but only if i'm surely the only function that would be appliable
              var count = 0;
              for (var k = 0; k < functions.length && count < 2; k++) {
                if (functions[k].params.name.params.name === this.params.func.params.name) {
                  count++;
                }
              }
              if (count < 2) {
                for (var i = 0; i < signature.params.paramTypes.length; i++) {
                  var sig = signature.params.paramTypes[i];
                  this.params.params[i].proposeDataType(sig);
                }
              } else {
                // nope :(
                this.params.func.functions.reset();
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