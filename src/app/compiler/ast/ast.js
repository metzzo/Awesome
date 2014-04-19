define([ 'app/compiler/ast/operator', 'app/compiler/ast/scope', 'app/compiler/ast/int_literal' ], function(operator, scope, int_literal) {  
  return {
    createNode: function(astPrototype, params) {
      if (!params) params = { };
      if (!astPrototype) {
        throw 'Invalid Parameter';
      }
      
      return Object.create({ }, {
        name: {
          value: astPrototype.name,
          enumerable: true,
          writeable: false
        },
        params: {
          value: params,
          enumerable: true,
          writeable: true
        },
        functions: {
          value: astPrototype.functions,
          enumerable: false,
          writeable: false
          
        },
        traverse: {
          value: function() {
            
          },
          enumerable: false,
          writeable: false
        }
      });
    },
    AstPrototypes: {
      SCOPE: scope,
      OPERATOR: operator,
      INT_LITERAL: int_literal
    }
  };
});