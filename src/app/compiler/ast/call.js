define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  return {
    name: 'Call',
    params: {
      func: null,
      signature: null,
      returnValue: null,
      params: [ ]
    },
    functions: {
      traverse: function(cb) {
        this.params.func.traverse(cb);
        
        for (var i = 0; i < this.params.params.length; i++) {
          this.params.params[i].traverse(cb);
        } 
      },
      getDataType: function(){
        return dataTypeModule.MetaDataTypes.UNKNOWN;
      },
      updateFunc: function() {
        var identifier;
        
        if (identifier = this.params.func.params.identifier) {
          // it is using a variable as function 
          // TODO!
        } else {
          // it is using a function name as function
          var functions = this.getScope().functions.getFunctions();
          var realFunc = null;
          for (var i = 0; i < functions.length; i++) {
            var func = functions[i];
            if (func.params.name.params.name === this.params.func.params.name) {
              realFunc = func;
              break;
            }
          }
          if (realFunc) {
            
          } else {
            this.riseSyntaxError();
          }
        }
      },
      processDataTypes: function() {
        this.functions.updateFunc();
        
        
      },
      checkDataTypes: function() {
        
      }
    }
  };
});