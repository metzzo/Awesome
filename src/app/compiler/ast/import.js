define(['underscore', 'src/app/compiler/data/dataType', 'src/app/compiler/data/errorMessages'], function(_, dataTypeModule, errorMessages) {
  return {
    name: 'Import',
    params: {
      name: null,
      alias: null
    },
    functions: {
      getDataType: function() {
        return dataTypeModule.PrimitiveDataTypes.VOID;
      },
      getVariables: function() {
        var ast = this.getContext().getFile(this.params.name).ast;
        return ast.getVariables();
      },
      getFunctions: function(modules) {
        if (modules.indexOf(this.params.name) === -1) {
          modules.push(this.params.name);
          var ast = this.getContext().getFile(this.params.name).ast;
          return ast.getFunctions(modules);
        } else {
          return [ ];
        }
      },
      processImports: function() {
        var ctx = this.getContext();
        var content = ctx.loadFile(this.params.name);
        if (!_.isNull(content)) {
          ctx.addFile(this.params.name, content);
        } else {
          this.riseSyntaxError(errorMessages.CANNOT_RESOLVE_IMPORT);
        }
      }
    }
  };
});